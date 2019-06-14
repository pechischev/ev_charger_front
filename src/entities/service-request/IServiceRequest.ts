import { IUser } from "@entities/user";
import { ERequestType } from "@entities/service-request/ERequestType";

export interface IServiceRequest {
    id: number;
    requestType: ERequestType;
    dataTime: string;
    user: Pick<IUser, "firstName" | "lastName">;
    address: string;
    residence: string;
    subject?: string;
    comment: string;
    chargerId?: number;
    requestStatus: string;
}
