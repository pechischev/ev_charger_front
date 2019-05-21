import { FormRenderProps } from "react-final-form";

export interface IWorkerForm {
    api: FormRenderProps;
    submitting?: boolean;
    canCancel?: boolean;
}
