import { IItem } from "@entities/_common";

export interface IPromoCode {
    id: number;
    code: string;
    timeAction: number;
    amount: number;
    amountType: string;
    residences: IItem[];
    status: string;
}
