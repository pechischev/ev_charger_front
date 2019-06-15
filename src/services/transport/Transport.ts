import { EPaths, ITokens, Nullable } from "@app/config";
import { AppContext } from "@context";
import { config } from "@services/config";
import { EApiMethods, EApiRoutes, TApiParams, TAxiosResponse } from "@services/transport";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import * as _ from "lodash";
import { get } from "lodash";
import { PartialObserver, Subject, Unsubscribable } from "rxjs";
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
        error?: Nullable<((error: any) => void) | null>, // tslint:disable-line:no-any
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

    async getOperators(): Promise<TAxiosResponse<EApiRoutes.OPERATORS>> {
        return this.client.get(EApiRoutes.OPERATORS);
    }

    async login(params: TApiParams<EApiRoutes.SIGN_IN>): Promise<TAxiosResponse<EApiRoutes.SIGN_IN>> {
        return this.client.post(EApiRoutes.SIGN_IN, params);
    }

    async profile(): Promise<TAxiosResponse<EApiRoutes.PROFILE>> {
        return this.client.get(EApiRoutes.PROFILE);
    }

    async getUsers(params: TApiParams<EApiRoutes.GET_USERS>): Promise<TAxiosResponse<EApiRoutes.GET_USERS>> {
        return this.client.get(EApiRoutes.GET_USERS, { params });
    }

    async getUserData(userId: string): Promise<TAxiosResponse<EApiRoutes.USER_DATA, EApiMethods.GET>> {
        return this.client.get(`${EApiRoutes.USER_DATA.replace("{customerId}", userId)}`);
    }

    async createUser(params: TApiParams<EApiRoutes.CREATE_USER>): Promise<TAxiosResponse<EApiRoutes.CREATE_USER>> {
        return this.client.post(EApiRoutes.CREATE_USER, params);
    }

    async updateUser(params: TApiParams<EApiRoutes.USER_DATA>, userId: string):
        Promise<TAxiosResponse<EApiRoutes.USER_DATA, EApiMethods.PUT>> {
        return this.client.put(`${EApiRoutes.USER_DATA.replace("{customerId}", userId)}`, params);
    }

    async getResidencesList(params: TApiParams<EApiRoutes.GET_RESIDENCES_LIST>):
        Promise<TAxiosResponse<EApiRoutes.GET_RESIDENCES_LIST>> {
        return this.client.get(EApiRoutes.GET_RESIDENCES_LIST, { params });
    }

    async createResidence(params: TApiParams<EApiRoutes.CREATE_RESIDENCE>):
        Promise<TAxiosResponse<EApiRoutes.CREATE_RESIDENCE>> {
        return this.client.post(EApiRoutes.CREATE_RESIDENCE, params);
    }

    async getResidence(residenceId: string): Promise<TAxiosResponse<EApiRoutes.RESIDENCE_DATA, EApiMethods.GET>> {
        return this.client.get(`${EApiRoutes.RESIDENCE_DATA.replace("{residenceId}", residenceId)}`);
    }

    async getResidenceChargesData(params: TApiParams<EApiRoutes.RESIDENCE_CHARGES>, residenceId: string):
        Promise<TAxiosResponse<EApiRoutes.RESIDENCE_CHARGES, EApiMethods.GET>> {
        return this.client.get(`${EApiRoutes.RESIDENCE_CHARGES.replace("{residenceId}", residenceId)}`, { params });
    }

    async getResidenceUsersData(params: TApiParams<EApiRoutes.GET_RESIDENCE_USERS>, residenceId: string):
        Promise<TAxiosResponse<EApiRoutes.GET_RESIDENCE_USERS, EApiMethods.GET>> {
        return this.client.get(`${EApiRoutes.GET_RESIDENCE_USERS.replace("{residenceId}", residenceId)}`, { params });
    }

    async updateResidence(params: TApiParams<EApiRoutes.RESIDENCE_DATA>, residenceId: string):
        Promise<TAxiosResponse<EApiRoutes.RESIDENCE_DATA, EApiMethods.PUT>> {
        return this.client.put(`${EApiRoutes.RESIDENCE_DATA.replace("{residenceId}", residenceId)}`, params);
    }

    async createCharger(params: TApiParams<EApiRoutes.CREATE_CHARGER>, residenceId: string):
        Promise<TAxiosResponse<EApiRoutes.CREATE_CHARGER>> {
        return this.client.post(`${EApiRoutes.CREATE_CHARGER.replace("{residenceId}", residenceId)}`, params);
    }

    async getCharger(residenceId: string, chargerId: string):
        Promise<TAxiosResponse<EApiRoutes.CHARGER, EApiMethods.GET>> {
        return this.client.get(`${EApiRoutes.CHARGER.replace("{residenceId}", residenceId)
            .replace("{chargerId}", chargerId)}`);
    }

    async updateCharger(params: TApiParams<EApiRoutes.CHARGER, EApiMethods.PUT>, residenceId: string):
        Promise<TAxiosResponse<EApiRoutes.CHARGER, EApiMethods.PUT>> {
        const { id, ...rest } = params;
        return this.client.put(`${EApiRoutes.CHARGER.replace("{residenceId}", residenceId)
            .replace("{chargerId}", _.toString(id))}`, rest);
    }

    async removeCharger(residenceId: string, chargerId: string):
        Promise<TAxiosResponse<EApiRoutes.CHARGER, EApiMethods.DELETE>> {
        return this.client.delete(`${EApiRoutes.CHARGER.replace("{residenceId}", residenceId)
            .replace("{chargerId}", chargerId)}`);
    }

    async getCompanyInfo(): Promise<TAxiosResponse<EApiRoutes.COMPANY_SETTINGS, EApiMethods.GET>> {
        return this.client.get(EApiRoutes.COMPANY_SETTINGS);
    }

    async updateCompanyInfo(params: TApiParams<EApiRoutes.COMPANY_SETTINGS>):
        Promise<TAxiosResponse<EApiRoutes.COMPANY_SETTINGS, EApiMethods.POST>> {
        return this.client.post(EApiRoutes.COMPANY_SETTINGS, params);
    }

    async getWorkers(params: TApiParams<EApiRoutes.GET_WORKERS>): Promise<TAxiosResponse<EApiRoutes.GET_WORKERS>> {
        return this.client.get(EApiRoutes.GET_WORKERS, { params });
    }

    async createWorker(params: TApiParams<EApiRoutes.CREATE_WORKER>):
        Promise<TAxiosResponse<EApiRoutes.CREATE_WORKER>> {
        return this.client.post(EApiRoutes.CREATE_WORKER, params);
    }

    async updateWorker(params: TApiParams<EApiRoutes.WORKER_DATA>, workerId: string):
        Promise<TAxiosResponse<EApiRoutes.WORKER_DATA, EApiMethods.PUT>> {
        return this.client.put(`${EApiRoutes.WORKER_DATA.replace("{workerId}", workerId)}`, params);
    }

    async removeWorker(workerId: string): Promise<TAxiosResponse<EApiRoutes.WORKER_DATA, EApiMethods.DELETE>> {
        return this.client.delete(`${EApiRoutes.WORKER_DATA.replace("{workerId}", workerId)}`);
    }

    async getWorkerData(workerId: string): Promise<TAxiosResponse<EApiRoutes.WORKER_DATA, EApiMethods.GET>> {
        return this.client.get(`${EApiRoutes.WORKER_DATA.replace("{workerId}", workerId)}`);
    }

    async bindOperator(params: TApiParams<EApiRoutes.BIND_WORKER>): Promise<TAxiosResponse<EApiRoutes.BIND_WORKER>> {
        return this.client.post(EApiRoutes.BIND_WORKER, params);
    }

    async getBoundResidences(params: TApiParams<EApiRoutes.GET_BOUND_RESIDENCES>):
        Promise<TAxiosResponse<EApiRoutes.GET_BOUND_RESIDENCES>> {
        return this.client.post(EApiRoutes.GET_BOUND_RESIDENCES, params);
    }

    async getBillingInfo(): Promise<TAxiosResponse<EApiRoutes.BILLING_SETTINGS, EApiMethods.GET>> {
        return this.client.get(EApiRoutes.BILLING_SETTINGS);
    }

    async updateBillingInfo(params: TApiParams<EApiRoutes.BILLING_SETTINGS>):
        Promise<TAxiosResponse<EApiRoutes.BILLING_SETTINGS, EApiMethods.POST>> {
        return this.client.post(EApiRoutes.BILLING_SETTINGS, params);
    }

    async getVehicleBrands(params: TApiParams<EApiRoutes.GET_VEHICLE_BRANDS>):
        Promise<TAxiosResponse<EApiRoutes.GET_VEHICLE_BRANDS>> {
        return this.client.get(EApiRoutes.GET_VEHICLE_BRANDS, { params });
    }

    async getVehicleBrand(brandId: string): Promise<TAxiosResponse<EApiRoutes.VEHICLE_BRAND, EApiMethods.GET>> {
        return this.client.get(`${EApiRoutes.VEHICLE_BRAND.replace("{brandId}", brandId)}`);
    }

    async createVehicleBrand(params: TApiParams<EApiRoutes.CREATE_VEHICLE_BRAND>):
        Promise<TAxiosResponse<EApiRoutes.CREATE_VEHICLE_BRAND>> {
        return this.client.post(EApiRoutes.CREATE_VEHICLE_BRAND, params);
    }

    async updateVehicleBrand(params: TApiParams<EApiRoutes.VEHICLE_BRAND>):
        Promise<TAxiosResponse<EApiRoutes.VEHICLE_BRAND>> {
        const { brandId, ...rest } = params;
        return this.client.put(`${EApiRoutes.VEHICLE_BRAND
            .replace("{brandId}", _.toString(brandId))}`, rest,
        );
    }

    async removeVehicleBrand(brandId: string): Promise<TAxiosResponse<EApiRoutes.VEHICLE_BRAND>> {
        return this.client.delete(`${EApiRoutes.VEHICLE_BRAND.replace("{brandId}", _.toString(brandId))}`);
    }

    async getVehicleModels(params: TApiParams<EApiRoutes.GET_VEHICLE_MODELS>, brandId: string):
        Promise<TAxiosResponse<EApiRoutes.GET_VEHICLE_MODELS>> {
        return this.client.get(`${EApiRoutes.GET_VEHICLE_MODELS
            .replace("{brandId}", brandId)}`, { params },
        );
    }

    async createVehicleModel(params: TApiParams<EApiRoutes.CREATE_VEHICLE_MODEL>):
        Promise<TAxiosResponse<EApiRoutes.CREATE_VEHICLE_MODEL>> {
        const { brandId, ...rest } = params;
        return this.client.post(`${EApiRoutes.CREATE_VEHICLE_MODEL
            .replace("{brandId}", _.toString(brandId))}`, rest,
        );
    }

    async removeVehicleModel(brandId: string, modelId: string): Promise<TAxiosResponse<EApiRoutes.VEHICLE_MODEL>> {
        return this.client.delete(`${EApiRoutes.VEHICLE_MODEL
            .replace("{brandId}", brandId)
            .replace("{modelId}", modelId)
            }`);
    }

    async checkUsedVehicleData(params: TApiParams<EApiRoutes.CHECK_VEHICLE_USED_DATA>):
        Promise<TAxiosResponse<EApiRoutes.CHECK_VEHICLE_USED_DATA>> {
        return this.client.post(EApiRoutes.CHECK_VEHICLE_USED_DATA, params);
    }

    async getTransactions(params: TApiParams<EApiRoutes.GET_TRANSACTIONS>):
        Promise<TAxiosResponse<EApiRoutes.GET_TRANSACTIONS>> {
        return this.client.get(EApiRoutes.GET_TRANSACTIONS, { params });
    }

    async getTransactionData(transactionId: number): Promise<TAxiosResponse<EApiRoutes.TRANSACTION_DATA>> {
        return this.client.get(`${EApiRoutes.TRANSACTION_DATA.replace("{transactionId}", _.toString(transactionId))}`);
    }

    async updateTransactionInfo(params: TApiParams<EApiRoutes.TRANSACTION_DATA>, transactionId: number):
        Promise<TAxiosResponse<EApiRoutes.TRANSACTION_DATA, EApiMethods.POST>> {
        return this.client.post(
            `${EApiRoutes.TRANSACTION_DATA.replace("{transactionId}", _.toString(transactionId))}`, params
        );
    }

    async getUserBillingInfo(params: TApiParams<EApiRoutes.GET_BILLING_DATA>, customerId: string):
        Promise<TAxiosResponse<EApiRoutes.GET_BILLING_DATA>> {
        return this.client.get(`${EApiRoutes.GET_BILLING_DATA.replace("{customerId}", customerId)}`, {params});
    }

    async getPromoCodesList(params: TApiParams<EApiRoutes.GET_PROMO_CODES>):
        Promise<TAxiosResponse<EApiRoutes.GET_PROMO_CODES>> {
        return this.client.get(EApiRoutes.GET_PROMO_CODES, {params});
    }

    async createPromoCode(params: TApiParams<EApiRoutes.CREATE_PROMO_CODE>):
        Promise<TAxiosResponse<EApiRoutes.CREATE_PROMO_CODE>> {
        return this.client.post(EApiRoutes.CREATE_PROMO_CODE, params);
    }

    async getPromoCode(codeId: string): Promise<TAxiosResponse<EApiRoutes.PROMO_CODE, EApiMethods.GET>> {
        return this.client.get(`${EApiRoutes.PROMO_CODE.replace("{codeId}", codeId)}`);
    }

    async updatePromoCode(params: TApiParams<EApiRoutes.PROMO_CODE>, codeId: string):
        Promise<TAxiosResponse<EApiRoutes.PROMO_CODE>> {
        return this.client.put(`${EApiRoutes.PROMO_CODE.replace("{codeId}", codeId)}`, params);
    }

    async removePromoCode(codeId: string): Promise<TAxiosResponse<EApiRoutes.PROMO_CODE>> {
        return this.client.delete(`${EApiRoutes.PROMO_CODE.replace("{codeId}", codeId)}`);
    }
}
