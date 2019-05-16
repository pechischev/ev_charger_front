import { EStatus, IUser } from "@entities/user";
import { IItem } from "@entities/_common";

export interface IResidence {
    id: number;
    title: string;
    billingRate: number;
    serviceFee: number
    address: string;
    city: string;
    state: IItem;
    zipCode: string;
    status: EStatus;
    operator: {
        userId: string;
        user: Pick<IUser, "firstName" | "lastName">;
    };
    chargerCount: number;
    customerCount: number;
}
