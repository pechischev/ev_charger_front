import { EApiMethods } from "./EApiMethods";
import { EApiRoutes } from "./EApiRoutes";
import {
    IBillingSettingsParams,
    IBindOperatorParams,
    IChargerParams,
    ICompanyInfoParams,
    IGetBoundResidencesParams,
    IListParams,
    ILoginParams,
    IResidenceParams,
    IUserParams,
    IVehicleBrandParams,
    IVehicleDataCountParams,
    IVehicleModelParams,
    IWorkerParams,
    IPromoCodeParams,
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
    | IBillingSettingsParams
    | IUserParams
    | IVehicleModelParams
    | IVehicleBrandParams
    | IVehicleDataCountParams
    | Partial<IPromoCodeParams>
    | IPromoCodeParams;

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
    [EApiRoutes.BILLING_SETTINGS]: IBillingSettingsParams;
    [EApiRoutes.GET_VEHICLE_BRANDS]: IListParams;
    [EApiRoutes.CREATE_VEHICLE_BRAND]: IVehicleBrandParams;
    [EApiRoutes.VEHICLE_BRAND]: IVehicleBrandParams;
    [EApiRoutes.GET_VEHICLE_MODELS]: IListParams;
    [EApiRoutes.CREATE_VEHICLE_MODEL]: IVehicleModelParams;
    [EApiRoutes.VEHICLE_MODEL]: IVehicleModelParams;
    [EApiRoutes.CHECK_VEHICLE_USED_DATA]: IVehicleDataCountParams;
    [EApiRoutes.PROMO_CODE]: Partial<IPromoCodeParams>;
    [EApiRoutes.CREATE_PROMO_CODE]: IPromoCodeParams;
}

// @ts-ignore:2344
export type TApiParams<K extends keyof IApiRouteParamsMap,
    // tslint:disable-next-line:no-any
    M extends EApiMethods = any> = IApiRouteParamsMap[K] extends IMethodMap<TParamsUnion>
    ? IApiRouteParamsMap[K][M]
    : IApiRouteParamsMap[K];
