import { IItem } from "@entities/_common";
import { EStatus, IUser } from "@entities/user";

export interface IResidenceListItem {
    id: number;
    title: string;
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
