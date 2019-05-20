import { ERoles, IUser } from "@entities/user";
import { IItem } from "@entities/_common";

export interface IEmployee extends IUser {
    password: string;
    confirmPassword: string;
    role: ERoles;
    residencesList: IItem;
}
