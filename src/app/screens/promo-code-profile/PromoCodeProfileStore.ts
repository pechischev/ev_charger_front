import { action, observable } from "mobx";
import { Store } from "@components/store";
import { EApiMethods, EApiRoutes, TApiParams, TAxiosResponse } from "@services/transport";
import * as _ from "lodash";
import { isEmpty } from "lodash";
import { autobind } from "core-decorators";
import { IFieldError } from "@app/config/IFieldError";
import { Nullable } from "@app/config";
import { EPromoCodeFieldTypes } from "@app/components/promo-code-form";
import { IPromoCode } from "@entities/promo-code";

@autobind
export class PromoCodeProfileStore extends Store {
    @observable private data: IPromoCode = _.stubObject();
    private promoCodeId?: string;

    getPromoCode(promoCodeId: string): void {
        this.call(this.transport.getPromoCode(promoCodeId), this.onSuccessGetData, this.onError);
    }

    @action.bound
    setData(data: IPromoCode): void {
        this.data = data;
    }

    getData(): IPromoCode {
        return this.data;
    }

    @action.bound
    setPromoCodeId(data: string): void {
        this.promoCodeId = data;
    }

    getPromoCodeId(): Nullable<string> {
        return this.promoCodeId;
    }

    transformPromoCodeData(data?: IPromoCode): Nullable<TApiParams<EApiRoutes.PROMO_CODE>> {
        if (!data || isEmpty(data)) {
            return void 0;
        }
        const { amount, ...rest } = data;
        return { amount: parseFloat(`${amount}`), ...rest };
    }

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

    async updatePromoCode(params: TApiParams<EApiRoutes.PROMO_CODE>): Promise<void> {
        const { amount, ...rest } = params;
        return this.asyncCall(this.transport.updatePromoCode({
            ...rest,
            amount: parseFloat(`${amount}`),
        }, this.promoCodeId), this.onError).then(this.onUpdatePromoCode);
    }

    private onSuccessGetData(response: TAxiosResponse<EApiRoutes.PROMO_CODE, EApiMethods.GET>): void {
        console.info("[PromoCodeProfileStore.onSuccessGetData]: ", response);
        const data = _.get<TAxiosResponse<EApiRoutes.PROMO_CODE, EApiMethods.GET>, "data">(response, "data");
        this.setData(data);
    }

    private onUpdatePromoCode(response: TAxiosResponse<EApiRoutes.PROMO_CODE, EApiMethods.POST>): void {
        console.info("[PromoCodeProfileStore.onUpdatePromoCode]: ", response);
        const data = _.get<TAxiosResponse<EApiRoutes.PROMO_CODE, EApiMethods.POST>, "data">(response, "data");
        this.setData(data);
    }
}
