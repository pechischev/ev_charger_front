import { IUser } from "@entities/user";

export interface IServiceRequestListItem {
    id: number;
    requestType: string;
    data: string;
    user: Pick<IUser,  | "firstName" | "lastName">;
}
