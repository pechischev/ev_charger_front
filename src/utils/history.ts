import { EPaths } from "@app/config";
import { EStatus } from "@entities/user";
import { AppContext } from "@context";

export function redirectOnUserProfile(userId: number): void {
    const link = `/${EPaths.USER_PROFILE}?id=${userId}`;
    AppContext.getHistory().push(link);
}

export function redirectOnAddUserForm(): void {
    const link = `/${EPaths.USER_CREATE_FORM}`;
    AppContext.getHistory().push(link);
}

export function redirectToUsersList(): void {
    const link = `/${EPaths.USER_LIST}`;
    AppContext.getHistory().push(link);
    window.location.reload();
}

export function redirectOnResidenceProfile(resideceId: number): void {
    const link = `/${EPaths.RESIDENCE_PROFILE}?id=${resideceId}`;
    AppContext.getHistory().push(link);
}

export function redirectToResidenceList(): void {
    const link = `/${EPaths.RESIDENCE_LIST}`;
    AppContext.getHistory().push(link);
}

export function redirectToResidenceCreateForm(): void {
    const link = `/${EPaths.RESIDENCE_CREATE_FORM}`;
    AppContext.getHistory().push(link);
}

export function redirectToSettings(): void {
    const link = `/${EPaths.SETTINGS}`;
    AppContext.getHistory().push(link);
}

export function redirectToWorkerList(): void {
    const link = `/${EPaths.WORKER_LIST}`;
    AppContext.getHistory().push(link);
}

export function redirectToWorkerForm(userId: number): void {
    const link = `/${EPaths.WORKER_PROFILE}?id=${userId}`;
    AppContext.getHistory().push(link);
}

export function redirectToAddWorkerForm(): void {
    const link = `/${EPaths.WORKER_CREATE_FORM}`;
    AppContext.getHistory().push(link);
}

export function redirectToBillingInfoSettings(): void {
    const link = `/${EPaths.BILLING_INFO}`;
    AppContext.getHistory().push(link);
}

export function redirectToCompanyInfoSettings(): void {
    const link = `/${EPaths.COMPANY_INFO}`;
    AppContext.getHistory().push(link);
}

export function redirectToBrandSettings(): void {
    const link = `/${EPaths.CAR_BRANDS}`;
    AppContext.getHistory().push(link);
}

export function redirectToBrandModels(brandId: number): void {
    const link = `/${EPaths.CAR_MODELS}?id=${brandId}`;
    AppContext.getHistory().push(link);
}

export function redirectToTransactionList(): void {
    const link = `/${EPaths.TRANSACTIONS}`;
    AppContext.getHistory().push(link);
}

export function redirectOnTransactionProfile(transactionId: number): void {
    const link = `/${EPaths.TRANSACTION_PROFILE}?id=${transactionId}`;
    AppContext.getHistory().push(link);
}

export function redirectOnAddTransactionForm(): void {
    const link = `/${EPaths.TRANSACTION_CREATE_FORM}`;
    AppContext.getHistory().push(link);
}

export function redirectToPromoCodeList(): void {
    const link = `/${EPaths.PROMO_CODE_INFO}`;
    AppContext.getHistory().push(link);
}

export function redirectOnAddPromoCodeForm(): void {
    const link = `/${EPaths.PROMO_CODE_FORM}`;
    AppContext.getHistory().push(link);
}

export function redirectToPromoCodeProfile(promoCodeId: number): void {
    const link = `/${EPaths.PROMO_CODE_PROFILE}?id=${promoCodeId}`;
    AppContext.getHistory().push(link);
}

export function redirectToServiceRequest(): void {
    const link = `/${EPaths.SERVICE_REQUESTS}`;
    AppContext.getHistory().push(link);
}

export function redirectToServiceRequestProfile(requestId: number): void {
    const link = `/${EPaths.SERVICE_REQUESTS_PROFILE}?id=${requestId}`;
    AppContext.getHistory().push(link);
}

export function redirectToActiveResidence(): void {
    const link = `/${EPaths.RESIDENCE_LIST}?type=${EStatus.ACTIVE}`;
    AppContext.getHistory().push(link);
}

export function redirectToActiveUsers(): void {
    const link = `/${EPaths.USER_LIST}?type=${EStatus.ACTIVE}`;
    AppContext.getHistory().push(link);
}

export function redirectToUsersThisMonth(from: number, to: number): void {
    const link = `/${EPaths.USER_LIST}?from=${from}&to=${to}`;
    AppContext.getHistory().push(link);
}

export function redirectToTransactionsThisMonth(from: number, to: number): void {
    const link = `/${EPaths.TRANSACTIONS}?from=${from}&to=${to}`;
    AppContext.getHistory().push(link);
}
