import * as React from "react";
import { FC } from "react";
import { IField } from "./IField";
import "./Field.scss";
import { InputField } from "./InputField";
import { EMessages } from "@utils/EMessage";
import { formatValue } from "@utils";
import { Nullable } from "@app/config";

const MAX_PLATE_LENGTH = 8;

export const LicencePlateField: FC<IField> = ({ name, ...rest }) => {
    const validateLicencePlateValue = (value: string): Nullable<string> => {
        if (!!value && value.length > MAX_PLATE_LENGTH) {
            return EMessages.LICENCE_PLATE_INCORRECT;
        }
        return void 0;
    };

    return (
        <InputField
            label={"Licence plate"}
            name={name}
            placeholder={"Enter licence plate"}
            mask={"AAAAAAAA"}
            validate={validateLicencePlateValue}
            parse={(value) => formatValue(value, MAX_PLATE_LENGTH + 1)}
            {...rest}
        />
    );
};
