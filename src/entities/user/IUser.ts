import { EStatus, } from "@entities/user";

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    photo?: string;
    status: EStatus;
}
