import { EStatus, } from "@entities/user";

export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    photo?: string;
    status?: EStatus;
}
