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
