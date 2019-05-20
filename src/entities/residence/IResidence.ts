import { EStatus, IUser } from "@entities/user";
import { IItem } from "@entities/_common";

export interface IResidence {
    id: number;
    title: string;
    billingRate?: number;
    serviceFee?: string
    address: string;
    extraAddress?: string;
    city: string;
    state: IItem;
    zipCode: string;
    status: EStatus;
    operator: {
        id: number;
        user: Pick<IUser, "firstName" | "lastName">;
    };
}
