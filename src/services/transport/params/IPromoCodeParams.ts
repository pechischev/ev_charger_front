import { IItem } from "@entities/_common";

export interface IPromoCodeParams {
    id: number;
    code: string;
    timeAction: string;
    amount: number;
    amountType: string;
    residences: IItem[];
    status: string;
}
