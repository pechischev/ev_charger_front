import * as React from "react";
import { FC } from "react";
import { IField } from "./IField";
import "./Field.scss";
import { InputField } from "./InputField";
import { EMessages } from "@utils/EMessage";
import { toNumber } from "lodash";

export const ZipCodeField: FC<IField> = ({ name, ...rest }) => {
    const validateZipCodeValue = (value: string): string => {
        if (!value) {
            return EMessages.EMPTY;
        }
        if (value.length !== 5) {
            return EMessages.ZIP_CODE_INCORRECT;
        }
        if (isNaN(toNumber(value))) {
            return EMessages.ONLY_NUMBER;
        }
        return "";
    };

    const formatZipCode = (value: string): string => {
        if (!value) {
            return value;
        }
        if (value.length === 6) {
            return value.substring(0, value.length - 1);
        }
        return value;
    };

    return (
        <InputField
            label={"Zip code"}
            name={name}
            placeholder={"Enter zip code"}
            mask={"99999"}
            validate={validateZipCodeValue}
            parse={formatZipCode}
            {...rest}
        />
    );
};
