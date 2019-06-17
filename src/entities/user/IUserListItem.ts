import { EStatus } from "./EStatus";
import { IUser } from "./IUser";

export interface IUserListItem {
    subscription: {
        status: EStatus
    };
    residence: {
        id: number;
        title: string;
    };
    user: Pick<IUser, "id" | "firstName" | "lastName">;
}
