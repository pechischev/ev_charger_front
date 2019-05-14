import { AxiosResponse } from "axios";
import { EApiMethods } from "./EApiMethods";
import {
    ICustomerResponse,
    IListResponse,
    ILoginResponse,
} from "./responses";
import { IMethodMap, TMap } from "./TMap";
import { EApiRoutes } from "./EApiRoutes";
import { IUserListItem } from "@entities/user";

export interface IApiRoutesResponsesMap extends TMap<{}> {
    [EApiRoutes.SIGN_IN]: ILoginResponse;
    [EApiRoutes.GET_USERS]: IListResponse<IUserListItem>;
    [EApiRoutes.GET_USER_DATA]: {
        [EApiMethods.GET]: ICustomerResponse
    };
}

// @ts-ignore:2344
export type TAxiosResponse<
    K extends keyof IApiRoutesResponsesMap,
    // tslint:disable-next-line:no-any
    M extends EApiMethods = any
> = IApiRoutesResponsesMap[K] extends IMethodMap<{}>
    ? AxiosResponse<IApiRoutesResponsesMap[K][M]>
    : AxiosResponse<IApiRoutesResponsesMap[K]>;

// @ts-ignore:2344
export type TApiResponse<
    K extends keyof IApiRoutesResponsesMap,
    // tslint:disable-next-line:no-any
    M extends EApiMethods = any
> = IApiRoutesResponsesMap[K] extends IMethodMap<{}> ? IApiRoutesResponsesMap[K][M] : IApiRoutesResponsesMap[K];
