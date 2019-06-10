import { EApiMethods } from "./EApiMethods";
import { EApiRoutes } from "./EApiRoutes";
import {
    IBindOperatorParams, ICarBrandParams,
    IChargerParams,
    ICompanyInfoParams,
    IGetBoundResidencesParams,
    IListParams,
    ILoginParams,
    IResidenceParams,
    IUserParams,
    IWorkerParams,
} from "./params";
import { IMethodMap, TMap } from "./TMap";

export type TParamsUnion = ILoginParams
    | IListParams
    | IResidenceParams
    | IChargerParams
    | ICompanyInfoParams
    | IWorkerParams
    | IGetBoundResidencesParams
    | IBindOperatorParams
    | IUserParams
    | ICarBrandParams;

export interface IApiRouteParamsMap extends TMap<TParamsUnion> {
    [EApiRoutes.SIGN_IN]: ILoginParams;
    [EApiRoutes.GET_USERS]: IListParams;
    [EApiRoutes.CREATE_USER]: IUserParams;
    [EApiRoutes.USER_DATA]: IUserParams;
    [EApiRoutes.GET_RESIDENCES_LIST]: IListParams;
    [EApiRoutes.CREATE_RESIDENCE]: IResidenceParams;
    [EApiRoutes.RESIDENCE_DATA]: IResidenceParams;
    [EApiRoutes.CREATE_CHARGER]: IChargerParams;
    [EApiRoutes.CHARGER]: IChargerParams;
    [EApiRoutes.COMPANY_SETTINGS]: ICompanyInfoParams;
    [EApiRoutes.GET_WORKERS]: IListParams;
    [EApiRoutes.CREATE_WORKER]: IWorkerParams;
    [EApiRoutes.WORKER_DATA]: IWorkerParams;
    [EApiRoutes.BIND_WORKER]: IBindOperatorParams;
    [EApiRoutes.GET_BOUND_RESIDENCES]: IGetBoundResidencesParams;
    [EApiRoutes.CREATE_CAR_BRAND]: ICarBrandParams;
}

// @ts-ignore:2344
export type TApiParams<
    K extends keyof IApiRouteParamsMap,
    // tslint:disable-next-line:no-any
    M extends EApiMethods = any
> = IApiRouteParamsMap[K] extends IMethodMap<TParamsUnion> ? IApiRouteParamsMap[K][M] : IApiRouteParamsMap[K];
