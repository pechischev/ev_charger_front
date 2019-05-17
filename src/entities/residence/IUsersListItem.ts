import { EStatus, IUser } from "@entities/user";

export interface IUsersListItem {
    userId: number;
    aptUnit: string;
    status: EStatus;
    user: Pick<IUser, "firstName" | "lastName">;
}
