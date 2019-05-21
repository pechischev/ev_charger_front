import { AxiosResponse } from "axios";
import { EApiMethods } from "./EApiMethods";
import { ICompanyInfoResponse, IEmployeeResponse, IListResponse, ILoginResponse, IUserResponse } from "./responses";
import { IMethodMap, TMap } from "./TMap";
import { EApiRoutes } from "./EApiRoutes";
import { IAuthUser, IUserListItem, IWorker } from "@entities/user";
import { IItem } from "@entities/_common";
import { ICharger, IResidence, IResidenceListItem } from "@entities/residence";
import { IEmployee, IEmployeeListItem } from "@entities/company-employees";
import { ICustomer } from "@entities/customer";

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
    [EApiRoutes.GET_EMPLOYEES]: IListResponse<IEmployeeListItem>;
    [EApiRoutes.CREATE_EMPLOYEE]: IEmployeeResponse;
    [EApiRoutes.EMPLOYEE_DATA]: {
        [EApiMethods.GET]: IEmployee;
        [EApiMethods.PUT]: IEmployee;
        [EApiMethods.DELETE]: {};
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
    M extends EApiMethods = any> = IApiRoutesResponsesMap[K] extends IMethodMap<{}> ? IApiRoutesResponsesMap[K][M] : IApiRoutesResponsesMap[K];
