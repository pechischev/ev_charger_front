import { ERoles } from "@app/config";

export interface IAuthUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    roles: ERoles[];
}
