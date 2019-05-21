import * as React from "react";
import { FC } from "react";
import { IField } from "./IField";
import "./Field.scss";
import { InputField } from "./InputField";
import { EMessages } from "@utils/EMessage";


export const ZipCodeField: FC<IField> = ({ name, ...rest }) => {
    const validateZipCodeValue = (value: any) => {
        if (!value) {
            return EMessages.EMPTY;
        }
        if (value.length !== 5) {
            return EMessages.ZIP_CODE_INCORRECT;
        }
        if (isNaN(value)) {
            return EMessages.ONLY_NUMBER;
        }
        return "";
    };

    const formatZipCode = (value: string) => {
        if (!value) {
            return value;
        }
        if (value.length === 6) {
            value = value.substring(0, value.length - 1);
        }
        return value;
    };

    return (
        <InputField
            label={"Zip code"}
            name={name}
            placeholder={"Enter zip code"}
            mask={"99999"}
            validate={(value) => validateZipCodeValue(value)}
            parse={(value) => formatZipCode(value)}
            {...rest}
        />
    );
};
