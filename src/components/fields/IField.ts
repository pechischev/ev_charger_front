import { FieldProps } from "react-final-form";

export interface IField extends FieldProps<any> {
    label: string;
    placeholder?: string;
}
