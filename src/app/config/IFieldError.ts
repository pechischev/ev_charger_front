import { EFormTypes } from "@app/config";

export interface IFieldError {
    type: EFormTypes;
    codes: number[];
}
