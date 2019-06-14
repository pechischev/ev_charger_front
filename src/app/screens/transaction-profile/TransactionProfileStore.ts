import { action, observable } from "mobx";
import { Store } from "@components/store";
import { EApiMethods, EApiRoutes, TApiParams, TAxiosResponse } from "@services/transport";
import * as _ from "lodash";
import { get, isEmpty, stubObject } from "lodash";
import { autobind } from "core-decorators";
import { IFieldError } from "@app/config/IFieldError";
import { Nullable } from "@app/config";
import { ETransactionFieldTypes } from "@app/components/transaction-form";
import { ITransaction } from "@entities/transactions";

@autobind
export class TransactionProfileStore extends Store {
    @observable private data: ITransaction = stubObject();
    private transactionId?: number;

    @action.bound
    setData(data: ITransaction): void {
        this.data = data;
    }

    getData(): ITransaction {
        return this.data;
    }

    @action.bound
    setTransactionId(id: number): void {
        this.transactionId = id;
    }

    getTransactionId(): Nullable<number> {
        return get(this.data, "transactionId");
    }

    transformData(data?: ITransaction): Nullable<ITransaction> {
        if (!data || isEmpty(data)) {
            return void 0;
        }
        return data;
    }

    validateData(values: TApiParams<EApiRoutes.TRANSACTION_DATA>): IFieldError[] {
        const fields = [
            { type: ETransactionFieldTypes.RESIDENCE, codes: [] },
            { type: ETransactionFieldTypes.USER, codes: [] },
            { type: ETransactionFieldTypes.STATUS, codes: [] },
            { type: ETransactionFieldTypes.PAYMENT_TYPE, codes: [] },
            { type: ETransactionFieldTypes.AMOUNT, codes: [] },
        ];
        return fields;
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
