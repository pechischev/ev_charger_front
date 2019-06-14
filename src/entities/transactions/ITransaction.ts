import { ETransactionStatus } from "@entities/transactions/ETransactionStatus";
import { IItem } from "@entities/_common";
import { IUser } from "@entities/user";

export interface ITransaction {
    id: number;
    status: ETransactionStatus;
    amount: number;
    payDate: number;
    chargeToken: string;
    paymentType: string;
    residence: IItem;
    user: Pick<IUser, "id" | "firstName" | "lastName">;
}
