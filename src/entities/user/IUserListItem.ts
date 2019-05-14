import { EStatus } from "@entities/user/EStatus";
import { IUser } from "@entities/user/IUser";

export interface IUserListItem {
    status: EStatus;
    residence: {
        id: number;
        title: string;
    },
    user: Pick<IUser, "id" | "firstName" | "lastName">;
}
