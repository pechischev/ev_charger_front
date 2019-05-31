import { ERoles } from "./ERoles";

export interface IAuthUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    roles: ERoles[];
}
