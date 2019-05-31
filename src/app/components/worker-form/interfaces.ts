import { FormRenderProps } from "react-final-form";
import { EStatus } from "@entities/user";
import { IItem } from "@entities/_common";

export interface IWorkerForm {
    api: FormRenderProps;
    submitting?: boolean;
    canCancel?: boolean;
}

export interface IWorkerData {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    confirmPassword?: string;
    role: number;
    status: EStatus;
    residences?: IItem[];
}
