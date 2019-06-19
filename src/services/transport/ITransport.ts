import { EApiMethods, EApiRoutes, TAxiosResponse } from "@services/transport";
import { Subscribable, Unsubscribable } from "rxjs";
// noinspection TypeScriptPreferShortImport
import { TApiParams } from "./ApiParamsMap";

// tslint:disable-next-line:no-any
export interface ITransport<T = any> extends Subscribable<T>, Unsubscribable {

    getStates(): Promise<TAxiosResponse<EApiRoutes.GET_STATES>>;
    getResidences(): Promise<TAxiosResponse<EApiRoutes.GET_RESIDENCES>>;
    getMakes(): Promise<TAxiosResponse<EApiRoutes.GET_MAKES>>;
    getModels(makeId: string): Promise<TAxiosResponse<EApiRoutes.GET_MODELS>>;

    getOperators(): Promise<TAxiosResponse<EApiRoutes.OPERATORS>>;

    login(loginParams: TApiParams<EApiRoutes.SIGN_IN>): Promise<TAxiosResponse<EApiRoutes.SIGN_IN>>;

    profile(): Promise<TAxiosResponse<EApiRoutes.PROFILE>>;

    /** Customer */

    getUsers(params: TApiParams<EApiRoutes.GET_USERS>): Promise<TAxiosResponse<EApiRoutes.GET_USERS>>;
    getUserData(userId: string): Promise<TAxiosResponse<EApiRoutes.USER_DATA, EApiMethods.GET>>;
    createUser(params: TApiParams<EApiRoutes.CREATE_USER>):
        Promise<TAxiosResponse<EApiRoutes.CREATE_USER>>;
    updateUser(params: TApiParams<EApiRoutes.USER_DATA>, userId: string):
        Promise<TAxiosResponse<EApiRoutes.USER_DATA, EApiMethods.PUT>>;

    /** Residences */

    getResidencesList(params: TApiParams<EApiRoutes.GET_RESIDENCES_LIST>):
        Promise<TAxiosResponse<EApiRoutes.GET_RESIDENCES_LIST>>;
    createResidence(params: TApiParams<EApiRoutes.CREATE_RESIDENCE>):
        Promise<TAxiosResponse<EApiRoutes.CREATE_RESIDENCE>>;
    updateResidence(params: TApiParams<EApiRoutes.RESIDENCE_DATA>, residenceId: string):
        Promise<TAxiosResponse<EApiRoutes.RESIDENCE_DATA, EApiMethods.PUT>>;

    createCharger(params: TApiParams<EApiRoutes.CREATE_CHARGER>, residenceId: string):
        Promise<TAxiosResponse<EApiRoutes.CREATE_CHARGER>>;
    getCharger(residenceId: string, chargerId: string):
        Promise<TAxiosResponse<EApiRoutes.CHARGER, EApiMethods.GET>>;
    updateCharger(params: TApiParams<EApiRoutes.CHARGER, EApiMethods.PUT>, residenceId: string):
        Promise<TAxiosResponse<EApiRoutes.CHARGER, EApiMethods.PUT>>;
    removeCharger(residenceId: string, chargerId: string):
        Promise<TAxiosResponse<EApiRoutes.CHARGER, EApiMethods.DELETE>>;
    getBillingHistory(params: TApiParams<EApiRoutes.BILLING_HISTORY>, residenceId: string):
        Promise<TAxiosResponse<EApiRoutes.BILLING_HISTORY, EApiMethods.GET>>;

    /** Setting Company */

    getCompanyInfo(): Promise<TAxiosResponse<EApiRoutes.COMPANY_SETTINGS, EApiMethods.GET>>;
    updateCompanyInfo(params: TApiParams<EApiRoutes.COMPANY_SETTINGS>):
        Promise<TAxiosResponse<EApiRoutes.COMPANY_SETTINGS, EApiMethods.POST>>;

    getWorkers(params: TApiParams<EApiRoutes.GET_WORKERS>): Promise<TAxiosResponse<EApiRoutes.GET_WORKERS>>;
    createWorker(params: TApiParams<EApiRoutes.CREATE_WORKER>): Promise<TAxiosResponse<EApiRoutes.CREATE_WORKER>>;
    updateWorker(params: TApiParams<EApiRoutes.WORKER_DATA>, workerId: string):
        Promise<TAxiosResponse<EApiRoutes.WORKER_DATA, EApiMethods.PUT>>;
    removeWorker(workerId: string): Promise<TAxiosResponse<EApiRoutes.WORKER_DATA, EApiMethods.DELETE>>;
    getWorkerData(workerId: string): Promise<TAxiosResponse<EApiRoutes.WORKER_DATA, EApiMethods.GET>>;

    bindOperator(params: TApiParams<EApiRoutes.BIND_WORKER>): Promise<TAxiosResponse<EApiRoutes.BIND_WORKER>>;
    getBoundResidences(params: TApiParams<EApiRoutes.GET_BOUND_RESIDENCES>):
        Promise<TAxiosResponse<EApiRoutes.GET_BOUND_RESIDENCES>>;

    /** Vehicle Data */

    getVehicleBrands(params: TApiParams<EApiRoutes.GET_VEHICLE_BRANDS>):
        Promise<TAxiosResponse<EApiRoutes.GET_VEHICLE_BRANDS>>;
    getVehicleBrand(brandId: string): Promise<TAxiosResponse<EApiRoutes.VEHICLE_BRAND, EApiMethods.GET>>;
    createVehicleBrand(params: TApiParams<EApiRoutes.CREATE_VEHICLE_BRAND>):
        Promise<TAxiosResponse<EApiRoutes.CREATE_VEHICLE_BRAND>>;
    updateVehicleBrand(params: TApiParams<EApiRoutes.VEHICLE_BRAND>):
        Promise<TAxiosResponse<EApiRoutes.VEHICLE_BRAND>>;
    removeVehicleBrand(brandId: string): Promise<TAxiosResponse<EApiRoutes.VEHICLE_BRAND>>;

    getVehicleModels(params: TApiParams<EApiRoutes.GET_VEHICLE_MODELS>, brandId: string):
        Promise<TAxiosResponse<EApiRoutes.GET_VEHICLE_MODELS>>;
    createVehicleModel(params: TApiParams<EApiRoutes.CREATE_VEHICLE_MODEL>):
        Promise<TAxiosResponse<EApiRoutes.CREATE_VEHICLE_MODEL>>;
    removeVehicleModel(brandId: string, modelId: string): Promise<TAxiosResponse<EApiRoutes.VEHICLE_MODEL>>;

    checkUsedVehicleData(params: TApiParams<EApiRoutes.CHECK_VEHICLE_USED_DATA>):
        Promise<TAxiosResponse<EApiRoutes.CHECK_VEHICLE_USED_DATA>>;

    /** Transaction */

    getTransactions(params: TApiParams<EApiRoutes.GET_TRANSACTIONS>):
        Promise<TAxiosResponse<EApiRoutes.GET_TRANSACTIONS>>;
    getTransactionData(transactionId: number): Promise<TAxiosResponse<EApiRoutes.TRANSACTION_DATA>>;
    updateTransactionInfo(params: TApiParams<EApiRoutes.TRANSACTION_DATA>, transactionId: number):
        Promise<TAxiosResponse<EApiRoutes.TRANSACTION_DATA, EApiMethods.POST>>;
    getUserBillingInfo(params: TApiParams<EApiRoutes.GET_BILLING_DATA>, customerId: string):
        Promise<TAxiosResponse<EApiRoutes.GET_BILLING_DATA>>;

    /** PromoCodes */

    getPromoCodesList(params: TApiParams<EApiRoutes.GET_PROMO_CODES>):
        Promise<TAxiosResponse<EApiRoutes.GET_PROMO_CODES>>;
    createPromoCode(params: TApiParams<EApiRoutes.CREATE_PROMO_CODE>):
        Promise<TAxiosResponse<EApiRoutes.CREATE_PROMO_CODE>>;
    getPromoCode(codeId: string): Promise<TAxiosResponse<EApiRoutes.PROMO_CODE, EApiMethods.GET>>;
    updatePromoCode(params: TApiParams<EApiRoutes.PROMO_CODE>, codeId: string):
        Promise<TAxiosResponse<EApiRoutes.PROMO_CODE>>;
    removePromoCode(codeId: string): Promise<TAxiosResponse<EApiRoutes.PROMO_CODE>>;

    /** ServiceRequests */

    getServiceRequestsList(params: TApiParams<EApiRoutes.GET_SERVICE_REQUESTS>):
        Promise<TAxiosResponse<EApiRoutes.GET_SERVICE_REQUESTS>>;
    getServiceRequest(requestId: string): Promise<TAxiosResponse<EApiRoutes.SERVICE_REQUEST, EApiMethods.GET>>;
    updateServiceRequest(requestId: string):
        Promise<TAxiosResponse<EApiRoutes.SERVICE_REQUEST>>;
}
