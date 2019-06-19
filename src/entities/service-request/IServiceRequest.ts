import { IUser } from "@entities/user";
import { ERequestType } from "@entities/service-request/ERequestType";
import { IItem } from "@entities/_common";

export interface IServiceRequest {
    id: number;
    user: Pick<IUser, "id" | "firstName" | "lastName" | "email">;
    contactData: {
        address: string;
        city: string;
        zipCode: string;
        aptUnit: string;
        state: IItem;
        residence: IItem;
    };
    request: {
        type: ERequestType;
        sendingDate: number;
        resolved: boolean;
        subject: string;
        message: string;
        charger: string;
    };
}
