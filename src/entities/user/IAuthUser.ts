import { ERoles } from "@entities/user/ERoles";

export interface IAuthUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    roles: ERoles[];
}
