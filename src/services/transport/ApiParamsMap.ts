import { EApiMethods } from "./EApiMethods";
import { EApiRoutes } from "./EApiRoutes";
import {
    IListParams,
    ILoginParams,
    IResidenceParams,
    IUserParams,
} from "./params";
import { IMethodMap, TMap } from "./TMap";

export type TParamsUnion = ILoginParams
    | IListParams
    | IResidenceParams
    | IUserParams;

export interface IApiRouteParamsMap extends TMap<TParamsUnion> {
    [EApiRoutes.SIGN_IN]: ILoginParams;
    [EApiRoutes.GET_USERS]: IListParams;
    [EApiRoutes.CREATE_USER]: IUserParams;
    [EApiRoutes.USER_DATA]: IUserParams;
    [EApiRoutes.CREATE_RESIDENCE]: IResidenceParams;
}

// @ts-ignore:2344
export type TApiParams<
    K extends keyof IApiRouteParamsMap,
    // tslint:disable-next-line:no-any
    M extends EApiMethods = any
> = IApiRouteParamsMap[K] extends IMethodMap<TParamsUnion> ? IApiRouteParamsMap[K][M] : IApiRouteParamsMap[K];
