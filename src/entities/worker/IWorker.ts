import { EStatus, IUser } from "@entities/user";
import { IItem } from "@entities/_common";

export interface IWorker {
    user: Pick<IUser, "id" | "firstName" | "lastName" | "email"> & { password?: string };
    status: EStatus;
    role: IItem;
    residences?: IItem[];
}
