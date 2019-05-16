import { FieldProps } from "react-final-form";

export interface IField<T extends HTMLElement = HTMLElement > extends FieldProps<T> {
    label: string;
    placeholder?: string;
}
