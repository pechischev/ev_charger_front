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
