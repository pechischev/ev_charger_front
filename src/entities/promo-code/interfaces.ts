import { EStatus } from "@entities/user";
import { Omit } from "utility-types";
import { IItem } from "@entities/_common";

export enum EDiscountType {
    PERCENTAGE = "percentage",
    VALUE = "value"
}

export enum EDiscountCharacter {
    PERCENTAGE = "%",
    CURRENCY = "$"
}

export interface IPromoCodeInfo {
    id: number;
    code: string;
    actionTime: number;
    discount: number;
    discountType: EDiscountType;
    status: EStatus;
}

export type TPromoCodeFormData = Pick<IPromoCodeInfo, "code" | "discount" | "actionTime"> & {
    discountType: IItem;
    status: IItem;
    residences: IItem[];
};

export type TPromoCodeInfo = IPromoCodeInfo & { residences: IItem[] };

export type TPromoCodeListItem = Omit<TPromoCodeInfo, "actionTime">;
