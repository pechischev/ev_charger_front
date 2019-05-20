import { FormRenderProps } from "react-final-form";

export interface IEmployeeForm {
    api: FormRenderProps;
    submitting?: boolean;
    canCancel?: boolean;
}
