import { IError } from "@entities/error";

export interface IErrorResponse {
    success: boolean;
    errors: IError[];
}
