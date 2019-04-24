import { EApiMethods } from "./EApiMethods";
import { EApiRoutes } from "./EApiRoutes";
import {
    ILoginParams,
} from "./params";
import { IMethodMap, TMap } from "./TMap";

export type TParamsUnion =
    ILoginParams;

export interface IApiRouteParamsMap extends TMap<TParamsUnion> {
    [EApiRoutes.SIGN_IN]: ILoginParams;
}

// @ts-ignore:2344
export type TApiParams<
    K extends keyof IApiRouteParamsMap,
    // tslint:disable-next-line:no-any
    M extends EApiMethods = any
> = IApiRouteParamsMap[K] extends IMethodMap<TParamsUnion> ? IApiRouteParamsMap[K][M] : IApiRouteParamsMap[K];
