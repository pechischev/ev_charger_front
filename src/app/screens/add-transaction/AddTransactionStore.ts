import { Store } from "@components/store";
import { IFieldError } from "@app/config/IFieldError";
import { autobind } from "core-decorators";
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
}
