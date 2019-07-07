import { Omit } from "utility-types";
import { EStatus, IUser } from "@entities/user";
import { IItem } from "@entities/_common";

export interface ICustomer {
    userData: Omit<IUser, "status">;
    phone: string;
    subscription: {
        status: EStatus;
        canceled: string;
    };

    contactData: {
        address: string;
        city: string;
        state: IItem;
        zipCode: string;
        aptUnit: string;
        residence: IItem;
    };

    vehicle: {
        year: string;
        licensePlate: string;
        makes: IItem;
        model: IItem;
    };
}
