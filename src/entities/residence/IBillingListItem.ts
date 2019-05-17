import { IUser } from "@entities/user";

export interface IBillingListItem {
    id: number;
    date: string;
    user: Pick<IUser, "firstName" | "lastName">;
    transaction: {
        successful: number;
        unsuccessful: number;
    }
    revenueCount: number;
    serviceFee: number;
    netRevenue: number;
}
