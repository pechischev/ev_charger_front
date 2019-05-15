import { Store } from "@components/store";
import { IFieldError } from "@app/config/IFieldError";
import { EFieldTypes } from "@app/screens/add-user-form/constants";
import { ICustomer } from "@entities/customer";

export class AddUserFormStore extends Store {
    validateData(): IFieldError[] {
        return ([
            { type: EFieldTypes.FIRST_NAME, codes: [] },
            { type: EFieldTypes.LAST_NAME, codes: [] },
            { type: EFieldTypes.EMAIL, codes: [15] },
            { type: EFieldTypes.PHONE, codes: [19] },
            { type: EFieldTypes.RESIDENCE, codes: [] },
            { type: EFieldTypes.ADDRESS, codes: [] },
            { type: EFieldTypes.APT_UNIT, codes: [] },
            { type: EFieldTypes.CITY, codes: [] },
            { type: EFieldTypes.ZIP_CODE, codes: [] },
            { type: EFieldTypes.STATE, codes: [] },
            { type: EFieldTypes.MAKES, codes: [] },
            { type: EFieldTypes.MODEL, codes: [] },
            { type: EFieldTypes.YEAR, codes: [] },
            { type: EFieldTypes.LICENSE_PLATE, codes: [] },
        ]);
    }

    async createUser(data: ICustomer): Promise<void> {

    }
}
