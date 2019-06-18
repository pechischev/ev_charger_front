import { IUser } from "@entities/user";
import { ERequestType } from ".";

export interface IServiceRequestListItem {
    id: number;
    type: ERequestType;
    sendingDate: number;
    customer: Pick<IUser, "id" | "firstName" | "lastName" | "email">;
}
