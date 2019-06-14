import { ETransactionStatus } from "@entities/transactions";
import { IUser } from "@entities/user";
import { IItem } from "@entities/_common";

export interface ITransactionsResponse {
    id: number;
    status: ETransactionStatus;
    amount: number;
    payDate: number;
    chargeToken: string;
    residence: IItem;
    user: Pick<IUser, "id" | "firstName" | "lastName">;
}
