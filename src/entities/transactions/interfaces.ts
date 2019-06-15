import { IItem } from "@entities/_common";
import { IUser } from "@entities/user";

export enum ETransactionStatus {
    PAID = "paid",
    OVERDUE = "overdue"
}

export interface ITransaction {
    id: number;
    status: ETransactionStatus;
    amount: number;
    payDate: number;
    chargeToken: string;
}

export type TTransactionInfo = ITransaction & {
    residence: IItem;
    user: Pick<IUser, "id" | "firstName" | "lastName">;
};

export type TTransactionListItem = ITransaction & {
    nextPaymentDate: number;
    customer: Pick<IUser, "id" | "firstName" | "lastName">;
};

export type TTransactionFormData = Pick<TTransactionInfo, "status" | "amount" | "residence"> & {
    paymentType: string;
    customer: string;
};
