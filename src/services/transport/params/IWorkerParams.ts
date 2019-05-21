import { EStatus } from "@entities/user";

export interface IWorkerParams {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    role: number;
    status: EStatus;
    residences?: number[];
}
