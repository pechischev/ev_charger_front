import { ETransactionStatus } from ".";
import { IUser } from "@entities/user";

export interface ITransactionsListItem {
    id: number;
    status: ETransactionStatus;
    amount: number;
    payDate: number;
    nextPaymentDate: number;
    chargeToken: string;
    customer: Pick<IUser, "id" | "firstName" | "lastName">;
}
