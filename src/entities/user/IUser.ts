import { EStatus, IAvatar } from "@entities/user";

export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    photo?: IAvatar;
    status?: EStatus;
    password?: string;
    confirmPassword?: string;
}
