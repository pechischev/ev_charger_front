import { FormRenderProps } from "react-final-form";

export interface IRequestCustomForm {
    api: FormRenderProps;
    submitting?: boolean;
    canCancel?: boolean;
}
