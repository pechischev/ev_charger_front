import { EFormTypes } from "@app/config";

export interface IFieldError {
    type: EFormTypes | string;
    codes: number[];
}
