import { EPaths, ITokens, Nullable } from "@app/config";
import { AppContext } from "@context";
import { config } from "@services/config";
import { EApiMethods, EApiRoutes, TApiParams, TAxiosResponse } from "@services/transport";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { get } from "lodash";
import { Subject, Unsubscribable, PartialObserver } from "rxjs";
import { ITransport } from "./ITransport";

export class Transport<T extends object = object> implements ITransport {
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
        observer: Nullable<((value: T) => void) | PartialObserver<T> | null>,
        error?: Nullable<((error: any) => void) | null> , // tslint:disable-line:no-any
        complete?: () => void,
    ): Unsubscribable {
        if (!observer) {
            return this.interceptor$;
        }
        if (typeof observer === "object") {
            return this.interceptor$;
        }
        this.interceptor$.subscribe(observer, error || void 0, complete);
        this.observers = [...this.observers, observer, error || void 0, complete];
        return this.interceptor$;
    }

    unsubscribe(): void {
        this.interceptor$.unsubscribe();
        this.observers = [];
    }

    async getStates(): Promise<TAxiosResponse<EApiRoutes.GET_STATES>> {
        return this.client.get(EApiRoutes.GET_STATES);
    }

    async getResidences(): Promise<TAxiosResponse<EApiRoutes.GET_RESIDENCES>> {
        return this.client.get(EApiRoutes.GET_RESIDENCES);
    }

    async getMakes(): Promise<TAxiosResponse<EApiRoutes.GET_MAKES>> {
        return this.client.get(EApiRoutes.GET_MAKES);
    }

    async getModels(makeId: string): Promise<TAxiosResponse<EApiRoutes.GET_MODELS>> {
        return this.client.get(`${EApiRoutes.GET_MODELS.replace("{makeId}", makeId)}`);
    }

    async login(params: TApiParams<EApiRoutes.SIGN_IN>): Promise<TAxiosResponse<EApiRoutes.SIGN_IN>> {
        return this.client.post(EApiRoutes.SIGN_IN, params);
    }

    async getUsers(params: TApiParams<EApiRoutes.GET_USERS>): Promise<TAxiosResponse<EApiRoutes.GET_USERS>> {
        return this.client.get(EApiRoutes.GET_USERS, {params});
    }

    async getUserData(userId: string): Promise<TAxiosResponse<EApiRoutes.GET_USER_DATA, EApiMethods.GET>> {
        return this.client.get(`${EApiRoutes.GET_USER_DATA.replace("{customerId}", userId)}`);
    }

    async createUser(params: TApiParams<EApiRoutes.CREATE_USER>): Promise<TAxiosResponse<EApiRoutes.CREATE_USER>> {
        return this.client.post(EApiRoutes.CREATE_USER, params);
    }

    async getResidences(params: TApiParams<EApiRoutes.GET_RESIDENCES>): Promise<TAxiosResponse<EApiRoutes.GET_RESIDENCES>> {
        return this.client.get(EApiRoutes.GET_RESIDENCES, {params});
    }

    async getResidenceData(residenceId: string): Promise<TAxiosResponse<EApiRoutes.GET_RESIDENCE_DATA, EApiMethods.GET>> {
        return this.client.get(`${EApiRoutes.GET_RESIDENCE_DATA.replace("{residenceId}", residenceId)}`);
    }

    async getResidenceChargesData(params: TApiParams<EApiRoutes.GET_RESIDENCE_CHARGES>, residenceId: string): Promise<TAxiosResponse<EApiRoutes.GET_RESIDENCE_CHARGES, EApiMethods.GET>> {
        return this.client.get(`${EApiRoutes.GET_RESIDENCE_CHARGES.replace("{residenceId}", residenceId)}`);
    }

    async getResidenceUsersData(params: TApiParams<EApiRoutes.GET_RESIDENCE_USERS>, residenceId: string): Promise<TAxiosResponse<EApiRoutes.GET_RESIDENCE_USERS, EApiMethods.GET>> {
        return this.client.get(`${EApiRoutes.GET_RESIDENCE_USERS.replace("{residenceId}", residenceId)}`);
    }
}
