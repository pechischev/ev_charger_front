import { action, observable } from "mobx";
import { Store } from "@components/store";
import { EApiRoutes, TApiParams } from "@services/transport";
import { get, isEmpty, stubObject } from "lodash";
import { autobind } from "core-decorators";
import { IFieldError } from "@app/config/IFieldError";
import { Nullable } from "@app/config";
import { IWorkerData } from "@app/components/worker-form";
import { IWorker } from "@entities/worker";
import { ETransactionFieldTypes, ITransactionData } from "@app/components/transaction-form";

@autobind
export class TransactionProfileStore extends Store {
    @observable private data: IWorker = stubObject();
    @observable private formData: IWorkerData = stubObject();
    private transactionId?: string;

    @action.bound
    setData(data: IWorker): void {
        this.data = data;
    }

    getData(): IWorker {
        return this.data;
    }

    @action.bound
    setTransactionId(id: string): void {
        this.transactionId = id;
    }

    getTransactionId(): Nullable<number> {
        return get(this.data, "transactionId");
    }

    transformData(data?: ITransactionData): Nullable<ITransactionData> {
        if (!data || isEmpty(data)) {
            return void 0;
        }
        return { data };
    }

    validateData(values: TApiParams<EApiRoutes.CREATE_WORKER>): IFieldError[] {
        const fields = [
            { type: ETransactionFieldTypes.RESIDENCE, codes: [] },
            { type: ETransactionFieldTypes.USER, codes: [] },
            { type: ETransactionFieldTypes.STATUS, codes: [] },
            { type: ETransactionFieldTypes.PAYMENT_TYPE, codes: [] },
            { type: ETransactionFieldTypes.AMOUNT, codes: [] },
        ];
        return fields;
    }

    @action.bound
    async onSubmit(data: ITransactionData): Promise<void> {

    }

}
