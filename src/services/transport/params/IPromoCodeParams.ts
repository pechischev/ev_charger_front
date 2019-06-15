import { IPromoCodeInfo } from "@entities/promo-code";
import { Omit } from "utility-types";

export interface IPromoCodeParams extends Omit<IPromoCodeInfo, "id"> {
    residences: number[];
}
