import { IItem } from "@entities/_common";
import { EStatus, IUser } from "@entities/user";

export interface ITransaction {
    id: number;
    status: EStatus;
    amount: string;
    payDate: number;
    chargeToken: string;
    serviceFee: string;
    residence: {
        title: string;
    };
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
