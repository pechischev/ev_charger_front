import { IItem } from "@entities/_common";

export interface IPromoCode {
    id: number;
    code: string;
    timeAction: string;
    amount: number;
    amountType: string;
    residences: IItem[];
    status: string;
}
