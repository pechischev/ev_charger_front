import { IUser, ERoles } from "@entities/user";

export interface IEmployeeListItem extends IUser {
    role: ERoles;
}
