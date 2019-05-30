import { AxiosResponse } from "axios";
import { EApiMethods } from "./EApiMethods";
import { ICompanyInfoResponse, IListResponse, ILoginResponse, IUserResponse } from "./responses";
import { IMethodMap, TMap } from "./TMap";
import { EApiRoutes } from "./EApiRoutes";
import { IAuthUser, IUser, IUserListItem } from "@entities/user";
import { IWorker } from "@entities/worker";
import { IItem } from "@entities/_common";
import { ICharger, IResidence, IResidenceListItem } from "@entities/residence";
import { ICustomer } from "@entities/customer";

export interface IApiRoutesResponsesMap extends TMap<{}> {
    [EApiRoutes.GET_STATES]: IItem[];
    [EApiRoutes.GET_RESIDENCES]: IItem[];
    [EApiRoutes.GET_MAKES]: IItem[];
    [EApiRoutes.GET_MODELS]: IItem[];
    [EApiRoutes.OPERATORS]: Array<Pick<IUser, "id" | "firstName" | "lastName">>;
    [EApiRoutes.SIGN_IN]: ILoginResponse;
    [EApiRoutes.PROFILE]: IAuthUser;
    [EApiRoutes.GET_USERS]: IListResponse<IUserListItem>;
    [EApiRoutes.CREATE_USER]: IUserResponse;

    [EApiRoutes.USER_DATA]: {
        [EApiMethods.GET]: ICustomer;
        [EApiMethods.PUT]: ICustomer;
    };
    [EApiRoutes.GET_RESIDENCES_LIST]: IListResponse<IResidenceListItem>;
    [EApiRoutes.RESIDENCE_DATA]: {
        [EApiMethods.GET]: IResidence;
        [EApiMethods.PUT]: IResidence;
    };
    [EApiRoutes.CREATE_CHARGER]: ICharger;
    [EApiRoutes.COMPANY_SETTINGS]: {
        [EApiMethods.POST]: ICompanyInfoResponse;
        [EApiMethods.GET]: ICompanyInfoResponse;
    };
    [EApiRoutes.CHARGER]: {
        [EApiMethods.GET]: ICharger;
        [EApiMethods.PUT]: ICharger;
        [EApiMethods.DELETE]: {};
    };
    [EApiRoutes.GET_WORKERS]: IListResponse<IWorker>;
    [EApiRoutes.GET_BOUND_RESIDENCES]: number[];
    [EApiRoutes.WORKER_DATA]: {
        [EApiMethods.GET]: IWorker;
    };

}

// @ts-ignore:2344
export type TAxiosResponse<K extends keyof IApiRoutesResponsesMap,
    // tslint:disable-next-line:no-any
    M extends EApiMethods = any> = IApiRoutesResponsesMap[K] extends IMethodMap<{}>
    ? AxiosResponse<IApiRoutesResponsesMap[K][M]>
    : AxiosResponse<IApiRoutesResponsesMap[K]>;

// @ts-ignore:2344
export type TApiResponse<K extends keyof IApiRoutesResponsesMap,
    // tslint:disable-next-line:no-any
    M extends EApiMethods = any> = IApiRoutesResponsesMap[K] extends IMethodMap<{}>
        ? IApiRoutesResponsesMap[K][M] : IApiRoutesResponsesMap[K];
