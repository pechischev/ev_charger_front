import { IItem } from "@entities/_common";

export interface IPromoCodeResponse {
    id: number;
    code: string;
    timeAction: number;
    amount: number;
    amountType: string;
    residences: IItem[];
    status: string;
}
