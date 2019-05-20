import * as React from "react";
import { FC } from "react";
import { IField } from "./IField";
import "./Field.scss";
import { InputField } from "./InputField";
import { EMessages } from "@utils/EMessage";


export const PasswordField: FC<IField> = ({ label = "", name, ...rest }) => {
    const validateZipCodeValue = (value: any) => {
        if (!value) {
            return EMessages.EMPTY;
        }
        if (value.length < 6) {
            return EMessages.PASSWORD_INCORRECT;
        }
        return "";
    };

    return (
        <InputField
            label={ label }
            type={"password"}
            name={ name }
            placeholder={ "Enter " + label.toLowerCase() }
            validate={ (value) => validateZipCodeValue(value) }
            {...rest}
        />
    );
};
