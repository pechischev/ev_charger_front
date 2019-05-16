import { FormRenderProps } from "react-final-form";

export interface IResidenceForm {
    api: FormRenderProps;
    submitting?: boolean;
    canCancel?: boolean;
}
