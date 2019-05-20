import { IItem } from "@entities/_common";

export interface ICompany {
    id: number;
    companyName: string;
    address: string;
    extraAddress: string;
    state: IItem;
    zipCode: string;
    city: string;
    phone: string;
    email: string;
}
