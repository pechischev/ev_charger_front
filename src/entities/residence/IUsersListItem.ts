import { EStatus, IUser } from "@entities/user";

export interface IUsersListItem {
    userId: number;
    aptUnit: string;
    subscription: {
        status: EStatus;
    };
    user: Pick<IUser, "firstName" | "lastName">;
}
