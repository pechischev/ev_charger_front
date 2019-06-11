import { autobind } from "core-decorators";
import { Store } from "@components/store";
import { EApiMethods, EApiRoutes, TAxiosResponse } from "@services/transport";

@autobind
export class PromoCodesStore extends Store {

    async removeCharger(promoCodeId: number): Promise<void> {
        return this.asyncCall(this.transport.removePromoCode(promoCodeId.toString()))
            .then(this.onRemovedPromoCode);
    }

    private onRemovedPromoCode(response: TAxiosResponse<EApiRoutes.PROMO_CODES, EApiMethods.DELETE>): void {
        console.info("[PromoCodesStore.onRemovedPromoCode]: ", response);
    }
}
