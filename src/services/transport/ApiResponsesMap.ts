import { AxiosResponse } from "axios";
import { EApiMethods } from "./EApiMethods";
import {
    ICustomerResponse,
    IListResponse,
    ILoginResponse,
    IResidenceResponse,
    IUserResponse,
} from "./responses";
import { IMethodMap, TMap } from "./TMap";
import { EApiRoutes } from "./EApiRoutes";
import { IAuthUser, IUserListItem, IWorker } from "@entities/user";
import { IItem } from "@entities/_common";

export interface IApiRoutesResponsesMap extends TMap<{}> {
    [EApiRoutes.GET_STATES]: IItem[];
    [EApiRoutes.GET_RESIDENCES]: IItem[];
    [EApiRoutes.GET_MAKES]: IItem[];
    [EApiRoutes.GET_MODELS]: IItem[];
    [EApiRoutes.OPERATORS]: IWorker[];
    [EApiRoutes.SIGN_IN]: ILoginResponse;
    [EApiRoutes.PROFILE]: IAuthUser;
    [EApiRoutes.GET_USERS]: IListResponse<IUserListItem>;
    [EApiRoutes.CREATE_USER]: IUserResponse;
    [EApiRoutes.USER_DATA]: {
        [EApiMethods.GET]: ICustomerResponse;
        [EApiMethods.PUT]: ICustomerResponse;
    };
    [EApiRoutes.GET_RESIDENCES_LIST]: IListResponse<IResidenceResponse>;
    [EApiRoutes.RESIDENCE_DATA]: {
        [EApiMethods.GET]: IResidenceResponse;
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
