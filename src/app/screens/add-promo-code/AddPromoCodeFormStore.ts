import { Store } from "@components/store";
import { IFieldError } from "@app/config/IFieldError";
import { EApiRoutes, TApiParams, TAxiosResponse } from "@services/transport";
import { autobind } from "core-decorators";
import { redirectToPromoCodeList } from "@utils/history";
import { EPromoCodeFieldTypes } from "@app/components/promo-code-form";
import { TPromoCodeInfo } from "@entities/promo-code";
import * as _ from "lodash";

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

    async createPromoCode(data: TPromoCodeInfo): Promise<void> {
        const { discount, residences, actionTime, ...rest } = data;
        const params: TApiParams<EApiRoutes.CREATE_PROMO_CODE> = {
            ...rest,
            residences: residences.map((residence) => _.toNumber(residence.id)),
            discount: parseFloat(`${discount}`),
            actionTime: _.toNumber(actionTime),
        };
        return this.asyncCall(this.transport.createPromoCode(params))
            .then(this.onCreatePromoCode);
    }

    private onCreatePromoCode(response: TAxiosResponse<EApiRoutes.CREATE_PROMO_CODE>): void {
        console.info("[AddPromoCodeFormStore.onCreatePromoCode]", response);
        redirectToPromoCodeList();
    }
}
