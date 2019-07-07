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
import { parseAmountFieldValue } from "@utils";

@autobind
export class TransactionProfileStore extends Store {
    @observable private data: TTransactionInfo = stubObject();
    @observable private transactionId: Nullable<string> = "";

    @action.bound
    setData(data: TTransactionInfo): void {
        this.data = data;
    }

    @action.bound
    setTransactionId(id: string): void {
        this.transactionId = id;
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
        const { user, status, residence, amount, comment } = data;
        const { firstName, lastName } = user;
        return {
            paymentType: "Credit card",
            customer: `${firstName} ${lastName}`,
            status, residence, comment,
            amount: parseAmountFieldValue(amount.toString()),
        };
    }

    validateData(values: TTransactionInfo): IFieldError[] {
        const fields = [
            { type: ETransactionFieldTypes.STATUS, codes: [] },
            // add field comment because is be change status in the form
        ];
        if (this.data.status === "overdue" && values.status === "paid") {
            fields.push(
                { type: ETransactionFieldTypes.COMMENT, codes: [] }
            );
        }

        return fields;
    }

    async getTransactionData(transactionId: number): Promise<void> {
        return this.asyncCall(this.transport.getTransactionData(transactionId)).then(this.onSuccessGetData);
    }

    async updateTransaction(params: TTransactionFormData): Promise<void> {
        const { comment, status } = params;
        return this.asyncCall(this.transport.updateTransaction({
            status, comment
        }, this.transactionId as string), this.onError).then(this.onUpdateTransaction);
    }

    private onUpdateTransaction(response: TAxiosResponse<EApiRoutes.TRANSACTION_DATA, EApiMethods.POST>): void {
        console.info("[TransactionProfileStore.onUpdateTransaction]: ", response);
        const data = _.get<TAxiosResponse<EApiRoutes.TRANSACTION_DATA, EApiMethods.POST>, "data">(response, "data");
        this.setData(data);
    }

    private onSuccessGetData(response: TAxiosResponse<EApiRoutes.TRANSACTION_DATA, EApiMethods.GET>): void {
        console.info("[TransactionProfileStore.onSuccessGetData]: ", response);
        const data = _.get<TAxiosResponse<EApiRoutes.TRANSACTION_DATA, EApiMethods.GET>, "data">(response, "data");
        this.setData(data);
    }
}
