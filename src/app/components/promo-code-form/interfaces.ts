import { FormRenderProps } from "react-final-form";

export interface IPromoCodeForm {
    api: FormRenderProps;
    submitting?: boolean;
    canCancel?: boolean;
}
