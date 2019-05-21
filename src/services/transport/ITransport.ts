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

    getUsers(params: TApiParams<EApiRoutes.GET_USERS>): Promise<TAxiosResponse<EApiRoutes.GET_USERS>>;
    getUserData(userId: string): Promise<TAxiosResponse<EApiRoutes.USER_DATA, EApiMethods.GET>>;
    createUser(params: TApiParams<EApiRoutes.CREATE_USER>):
        Promise<TAxiosResponse<EApiRoutes.CREATE_USER>>;
    updateUser(params: TApiParams<EApiRoutes.USER_DATA>, userId: string):
        Promise<TAxiosResponse<EApiRoutes.USER_DATA, EApiMethods.PUT>>;

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

    getCompanyInfo(): Promise<TAxiosResponse<EApiRoutes.COMPANY_SETTINGS, EApiMethods.GET>>;
    updateCompanyInfo(params: TApiParams<EApiRoutes.COMPANY_SETTINGS>):
        Promise<TAxiosResponse<EApiRoutes.COMPANY_SETTINGS, EApiMethods.POST>>;
}
