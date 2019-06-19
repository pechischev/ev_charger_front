import { AxiosResponse } from "axios";
import { EApiMethods } from "./EApiMethods";
import {
    IBillingSettingsResponse,
    ICompanyInfoResponse,
    IListResponse,
    ILoginResponse,
    IStatisticDataResponse,
    IUserResponse,
    IVehicleDataCountResponse,
} from "./responses";
import { IMethodMap, TMap } from "./TMap";
import { EApiRoutes } from "./EApiRoutes";
import { IAuthUser, IBillingInfoListItem, IUser, IUserListItem } from "@entities/user";
import { IWorker } from "@entities/worker";
import { IItem } from "@entities/_common";
import { ICharger, IResidence, IResidenceListItem } from "@entities/residence";
import { ICustomer } from "@entities/customer";
import { TTransactionInfo, TTransactionListItem } from "@entities/transactions";
import { TPromoCodeInfo, TPromoCodeListItem } from "@entities/promo-code";
import { IServiceRequest, IServiceRequestListItem } from "@entities/service-request";
import { IReportData } from "@entities/company";

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

    [EApiRoutes.GET_BILLING_DATA]: IListResponse<IBillingInfoListItem>;
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
    [EApiRoutes.BILLING_SETTINGS]: {
        [EApiMethods.GET]: IBillingSettingsResponse;
    };
    [EApiRoutes.GET_VEHICLE_BRANDS]: IListResponse<object>;
    [EApiRoutes.GET_VEHICLE_MODELS]: IListResponse<object>;
    [EApiRoutes.VEHICLE_BRAND]: {
        [EApiMethods.GET]: IItem;
    };
    [EApiRoutes.VEHICLE_MODEL]: {
        [EApiMethods.GET]: IItem;
    };
    [EApiRoutes.CHECK_VEHICLE_USED_DATA]: IVehicleDataCountResponse;
    [EApiRoutes.GET_TRANSACTIONS]: IListResponse<TTransactionListItem>;
    [EApiRoutes.TRANSACTION_DATA]: {
        [EApiMethods.GET]: TTransactionInfo;
    };
    [EApiRoutes.GET_PROMO_CODES]: IListResponse<TPromoCodeListItem>;
    [EApiRoutes.PROMO_CODE]: {
        [EApiMethods.GET]: TPromoCodeInfo;
    };
    [EApiRoutes.GET_SERVICE_REQUESTS]: IListResponse<IServiceRequestListItem>;
    [EApiRoutes.SERVICE_REQUEST]: {
        [EApiMethods.GET]: IServiceRequest;
    };
    [EApiRoutes.STATISTICS]: IStatisticDataResponse;
    [EApiRoutes.REPORT_DATA]: IReportData[];
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
