import { EPaths, ITokens, Nullable } from "@app/config";
import { AppContext } from "@context";
import { config } from "@services/config";
import { EApiRoutes, TApiParams, TAxiosResponse } from "@services/transport";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { get } from "lodash";
import { Subject, Subscribable, Unsubscribable, PartialObserver } from "rxjs";
import { ITransport } from "./ITransport";

export class Transport<T extends object = object> implements ITransport, Subscribable<T>, Unsubscribable {
    private static BASE_URL: string;
    private static readonly DEFAULT_URL = "localhost:3000";
    private readonly client = axios.create({ baseURL: Transport.BASE_URL });
    private interceptor$ = new Subject<object>();
    // tslint:disable-next-line:no-any
    private observers: Array<Nullable<(value: any) => void>> = [];

    constructor(tokens?: ITokens) {
        Transport.BASE_URL = get(config, "url.base", Transport.DEFAULT_URL);
        const options: AxiosRequestConfig = { baseURL: Transport.BASE_URL };
        if (tokens && tokens.accessToken/* && tokens.refreshToken*/) {
            options.headers = {
                access_token: tokens.accessToken,
                /*refresh_token: tokens.refreshToken,*/
            };
        }
        this.client = axios.create(options);
        this.client.interceptors.request.use(
            (value: AxiosRequestConfig) => {
                this.interceptor$.unsubscribe();
                this.interceptor$ = new Subject();
                this.interceptor$.subscribe(...this.observers);
                this.interceptor$.next(value);
                return value;
            },
            async (error: Error) => {
                this.interceptor$.error(error);
                return Promise.reject(error);
            },
        );
        this.client.interceptors.response.use(
            (response: AxiosResponse) => {
                this.interceptor$.complete();
                return response;
            },
            async (error: AxiosError) => {
                this.interceptor$.error(error);
                return Promise.reject(error);
            },
        );
        this.observers.push(
            void 0,
            (error: AxiosError) => {
                const data = get(error, "response.data.error");
                if (!data) {
                    return;
                }
                // tslint:disable-next-line:no-magic-numbers
                const authErrorCodes = new Set([5, 12, 13]);
                const isAuthError = authErrorCodes.has(data.code);
                if (!isAuthError || !AppContext.getUserStore().isLoggedIn()) {
                    return;
                }
                AppContext.getUserStore().logout();
                window.location.pathname = `/${EPaths.LOGIN}`;
            },
            void 0,
        );
    }

    subscribe(
        observer?: ((value: T) => void) | PartialObserver<T>,
        error?: (error: any) => void, // tslint:disable-line:no-any
        complete?: () => void,
    ): Unsubscribable {
        if (!observer) {
            return this.interceptor$;
        }
        if (typeof observer === "object") {
            return this.interceptor$;
        }
        this.interceptor$.subscribe(observer, error, complete);
        this.observers = [...this.observers, observer, error, complete];
        return this.interceptor$;
    }

    unsubscribe(): void {
        this.interceptor$.unsubscribe();
        this.observers = [];
    }

    async login(params: TApiParams<EApiRoutes.SIGN_IN>): Promise<TAxiosResponse<EApiRoutes.SIGN_IN>> {
        return this.client.post(EApiRoutes.SIGN_IN, params);
    }

    async getUsers(params: TApiParams<EApiRoutes.GET_USERS>): Promise<TAxiosResponse<EApiRoutes.GET_USERS>> {
        return this.client.get(EApiRoutes.GET_USERS, {params});
    }
}
