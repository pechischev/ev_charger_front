// tslint:disable:no-magic-numbers
import { EFormTypes } from "./EFormTypes";
import { IFieldError } from "./IFieldError";

// tslint:disable-next-line:no-unnecessary-class
export class FieldErrors {
    private static readonly errors = [
        { type: EFormTypes.EMAIL, codes: [] },
        { type: EFormTypes.PASSWORD, codes: [] },
    ];

    static getTypesByCode(code: number): EFormTypes[] {
        const types: EFormTypes[] = [];
        FieldErrors.errors.forEach((value: IFieldError) => {
            if (value.codes.indexOf(code) === -1) {
                return;
            }
            types.push(value.type);
        });
        return types.length ? types : [EFormTypes.TEXT];
    }
}
