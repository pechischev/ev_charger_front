import { EPaths } from "@app/config";
import { AppContext } from "@context";

export function redirectOnCustomerProfile(userId: number): void {
    const link = `/${EPaths.USER_PROFILE}?id=${userId}`;
    AppContext.getHistory().push(link);
}
