import { FormRenderProps } from "react-final-form";

export interface ITransactionForm {
    api: FormRenderProps;
    submitting?: boolean;
    canCancel?: boolean;
}
