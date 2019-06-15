import { action, observable } from "mobx";
import { Store } from "@components/store";
import { EApiMethods, EApiRoutes, TAxiosResponse } from "@services/transport";
import * as _ from "lodash";
import { isEmpty } from "lodash";
import { autobind } from "core-decorators";
import { IFieldError } from "@app/config/IFieldError";
import { Nullable } from "@app/config";
import { EPromoCodeFieldTypes } from "@app/components/promo-code-form";
import { EDiscountCharacter, EDiscountType, TPromoCodeFormData, TPromoCodeInfo } from "@entities/promo-code";
import { EStatus } from "@entities/user";

@autobind
export class PromoCodeProfileStore extends Store {
    @observable private data: TPromoCodeInfo = _.stubObject();
    private promoCodeId?: string;

    getPromoCode(promoCodeId: string): void {
        this.call(this.transport.getPromoCode(promoCodeId), this.onSuccessGetData, this.onError);
    }

    @action.bound
    setData(data: TPromoCodeInfo): void {
        this.data = data;
    }

    getData(): TPromoCodeInfo {
        return this.data;
    }

    @action.bound
    setPromoCodeId(data: string): void {
        this.promoCodeId = data;
    }

    getPromoCodeId(): Nullable<string> {
        return this.promoCodeId;
    }

    transformPromoCodeData(data?: TPromoCodeInfo): Nullable<TPromoCodeFormData> {
        if (!data || isEmpty(data)) {
            return void 0;
        }
        const { discount, status, discountType, ...rest } = data;
        const discountSymbol = discountType === EDiscountType.PERCENTAGE
            ? EDiscountCharacter.PERCENTAGE
            : EDiscountCharacter.CURRENCY;
        return {
            discount: parseFloat(`${discount}`),
            status: { id: status, title: _.capitalize(status) },
            discountType: { id: discountType, title: discountSymbol },
            ...rest,
        };
    }

    validateData(): IFieldError[] {
        return [
            { type: EPromoCodeFieldTypes.STATUS, codes: [] },
        ];
    }

    async updatePromoCode(params: TPromoCodeFormData): Promise<void> {
        const { status } = params;
        return this.asyncCall(
            this.transport.updatePromoCode({ status: status.id as EStatus }, _.toString(this.promoCodeId))
        )
            .then(this.onUpdatePromoCode);
    }

    private onSuccessGetData(response: TAxiosResponse<EApiRoutes.PROMO_CODE, EApiMethods.GET>): void {
        console.info("[PromoCodeProfileStore.onSuccessGetData]: ", response);
        const data = _.get<TAxiosResponse<EApiRoutes.PROMO_CODE, EApiMethods.GET>, "data">(response, "data");
        this.setData(data);
    }

    private onUpdatePromoCode(response: TAxiosResponse<EApiRoutes.PROMO_CODE, EApiMethods.POST>): void {
        console.info("[PromoCodeProfileStore.onUpdatePromoCode]: ", response);
    }
}
