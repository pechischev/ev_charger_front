import { EStatus } from "@entities/user";

export interface ITransactionParams {
    status: EStatus;
    comment: string;
}
