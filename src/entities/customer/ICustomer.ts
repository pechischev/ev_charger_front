import { Omit } from "utility-types";
import { IUser } from "@entities/user";
import { IItem } from "@entities/_common";

export interface ICustomer {
    userData: Omit<IUser, "status">;
    phone: string;
    status: Pick<IUser, "status">;

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
