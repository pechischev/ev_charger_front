import { AxiosResponse } from "axios";
import { EApiMethods } from "./EApiMethods";
import {
    ILoginResponse,
    IResponse,
} from "./responses";
import { IMethodMap, TMap } from "./TMap";
import { EApiRoutes } from "./EApiRoutes";

export interface IApiRoutesResponsesMap extends TMap<object> {
    [EApiRoutes.SIGN_IN]: ILoginResponse;
}

// @ts-ignore:2344
export type TAxiosResponse<
    K extends keyof IApiRoutesResponsesMap,
    // tslint:disable-next-line:no-any
    M extends EApiMethods = any
> = IApiRoutesResponsesMap[K] extends IMethodMap<IResponse>
    ? AxiosResponse<IApiRoutesResponsesMap[K][M]>
    : AxiosResponse<IApiRoutesResponsesMap[K]>;

// @ts-ignore:2344
export type TApiResponse<
    K extends keyof IApiRoutesResponsesMap,
    // tslint:disable-next-line:no-any
    M extends EApiMethods = any
> = IApiRoutesResponsesMap[K] extends IMethodMap<IResponse> ? IApiRoutesResponsesMap[K][M] : IApiRoutesResponsesMap[K];
