import { IUser } from "@entities/user";

export interface IServiceRequest {
    id: number;
    requestType: string;
    data: string;
    user: Pick<IUser,  | "firstName" | "lastName">;
}
