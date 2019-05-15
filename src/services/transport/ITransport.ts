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

    login(loginParams: TApiParams<EApiRoutes.SIGN_IN>): Promise<TAxiosResponse<EApiRoutes.SIGN_IN>>;

    getUsers(params: TApiParams<EApiRoutes.GET_USERS>): Promise<TAxiosResponse<EApiRoutes.GET_USERS>>;
    getUserData(userId: string): Promise<TAxiosResponse<EApiRoutes.GET_USER_DATA, EApiMethods.GET>>;
}
