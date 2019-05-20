import * as React from "react";
import { FC } from "react";
import { IField } from "./IField";
import "./Field.scss";
import { InputField } from "./InputField";
import { EMessages } from "@utils/EMessage";


export const LicencePlateField: FC<IField> = ({ name, ...rest }) => {
    const validateLicencePlateValue = (value: string) => {
        if (!value) {
            return EMessages.EMPTY;
        }
        if (value.length > 8) {
            return EMessages.LICENCE_PLATE_INCORRECT;
        }
        return "";
    };

    const formatLicencePlate = (value: string) => {
        if (!value) {
            return value;
        }
        if (value.length === 9) {
            value = value.substring(0, value.length - 1)
        }
        return value;
    };

    return (
        <InputField
            label={ "Licence plate" }
            name={ name }
            placeholder={ "Enter licence plate" }
            mask={ "AAAAAAAA" }
            validate={ (value) => validateLicencePlateValue(value) }
            parse={ (value) => {
                return formatLicencePlate(value);
            }}
            {...rest}
        />
    );
};
