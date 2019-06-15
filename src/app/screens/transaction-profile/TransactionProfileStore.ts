import { action, observable } from "mobx";
import { Store } from "@components/store";
import { EApiMethods, EApiRoutes, TAxiosResponse } from "@services/transport";
import * as _ from "lodash";
import { get, isEmpty, stubObject } from "lodash";
import { autobind } from "core-decorators";
import { IFieldError } from "@app/config/IFieldError";
import { Nullable } from "@app/config";
import { ETransactionFieldTypes } from "@app/components/transaction-form";
import { TTransactionFormData, TTransactionInfo } from "@entities/transactions";

@autobind
export class TransactionProfileStore extends Store {
    @observable private data: TTransactionInfo = stubObject();

    @action.bound
    setData(data: TTransactionInfo): void {
        this.data = data;
    }

    getData(): TTransactionInfo {
        return this.data;
    }

    getTransactionId(): Nullable<number> {
        return get(this.data, "transactionId");
    }

    transformData(data?: TTransactionInfo): Nullable<TTransactionFormData> {
        if (!data || isEmpty(data)) {
            return void 0;
        }
        const { user, status, residence, amount } = data;
        const { firstName, lastName } = user;
        return {
            paymentType: "Credit card",
            customer: `${firstName} ${lastName}`,
            status, residence, amount
        };
    }

    validateData(): IFieldError[] {
        return [
            { type: ETransactionFieldTypes.RESIDENCE, codes: [] },
            { type: ETransactionFieldTypes.USER, codes: [] },
            { type: ETransactionFieldTypes.STATUS, codes: [] },
            { type: ETransactionFieldTypes.PAYMENT_TYPE, codes: [] },
            { type: ETransactionFieldTypes.AMOUNT, codes: [] },
        ];
    }

    async getTransactionData(transactionId: number): Promise<void> {
        return this.asyncCall(this.transport.getTransactionData(transactionId)).then(this.onSuccessGetData);
    }

    private onSuccessGetData(response: TAxiosResponse<EApiRoutes.TRANSACTION_DATA, EApiMethods.GET>): void {
        console.info("[TransactionProfileStore.onSuccessGetData]: ", response);
        const data = _.get<TAxiosResponse<EApiRoutes.TRANSACTION_DATA, EApiMethods.GET>, "data">(response, "data");
        this.setData(data);
    }
}
