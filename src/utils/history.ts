import { EPaths } from "@app/config";
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
