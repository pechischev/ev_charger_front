import { AxiosResponse } from "axios";
import { EApiMethods } from "./EApiMethods";
import {
    IResponse
} from "./responses";
import { IMethodMap, TMap } from "./TMap";

export interface IApiRoutesResponsesMap extends TMap<IResponse> {
    /*[EApiRoutes.SIGN_IN]: ILoginResponse;*/
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
