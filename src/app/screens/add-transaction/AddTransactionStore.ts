import { Store } from "@components/store";
import { IFieldError } from "@app/config/IFieldError";
import { autobind } from "core-decorators";
import { EApiRoutes, TApiParams, TAxiosResponse } from "@services/transport";
import { toNumber } from "lodash";
import { redirectToTransactionList } from "@utils/history";
import { ETransactionFieldTypes } from "@app/components/transaction-form";

@autobind
export class AddTransactionStore extends Store {

    validateData(): IFieldError[] {
        return [
            { type: ETransactionFieldTypes.RESIDENCE, codes: [] },
            { type: ETransactionFieldTypes.USER, codes: [] },
            { type: ETransactionFieldTypes.STATUS, codes: [] },
            { type: ETransactionFieldTypes.PAYMENT_TYPE, codes: [] },
            { type: ETransactionFieldTypes.AMOUNT, codes: [] },
        ];
    }

    async createResidence(params: TApiParams<EApiRoutes.CREATE_RESIDENCE>): Promise<void> {
        const { operatorId, ...rest } = params;
        return this.asyncCall(this.transport.createResidence({
            ...rest,
            operatorId: toNumber(operatorId),
        }), this.onError).then(this.onCreateResidence);
    }

    private onCreateResidence(response: TAxiosResponse<EApiRoutes.CREATE_RESIDENCE>): void {
        console.info("[AddTransactionStore.onCreateTransaction]", response);
        redirectToTransactionList();
    }
}
