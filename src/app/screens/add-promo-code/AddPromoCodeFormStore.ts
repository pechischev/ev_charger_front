import { Store } from "@components/store";
import { IFieldError } from "@app/config/IFieldError";
import { EApiRoutes, TAxiosResponse } from "@services/transport";
import { autobind } from "core-decorators";
import { redirectToPromoCodeList } from "@utils/history";
import { EPromoCodeFieldTypes } from "@app/components/promo-code-form";
import { IPromoCode } from "@entities/promo-code";

@autobind
export class AddPromoCodeFormStore extends Store {
    validateData(): IFieldError[] {
        return [
            { type: EPromoCodeFieldTypes.CODE, codes: [] },
            { type: EPromoCodeFieldTypes.AMOUNT_TYPE, codes: [] },
            { type: EPromoCodeFieldTypes.AMOUNT, codes: [] },
            { type: EPromoCodeFieldTypes.TIME_ACTION, codes: [] },
            { type: EPromoCodeFieldTypes.RESIDENCES, codes: [] },
            { type: EPromoCodeFieldTypes.STATUS, codes: [] },
        ];
    }

    async createPromoCode(data: IPromoCode): Promise<void> {
        const { amount, ...rest } = data;
        return this.asyncCall(this.transport.createPromoCode({
            ...rest,
            amount: parseFloat(`${amount}`),
        }), this.onError).then(this.onCreatePromoCode);
    }

    private onCreatePromoCode(response: TAxiosResponse<EApiRoutes.CREATE_PROMO_CODES>): void {
        console.info("[AddPromoCodeFormStore.onCreatePromoCode]", response);
        redirectToPromoCodeList();
    }
}
