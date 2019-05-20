import { IUser, ERoles } from "@entities/user";

export interface ICompanyUserListItem extends IUser {
    role: ERoles;
}
