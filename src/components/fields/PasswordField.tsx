import * as React from "react";
import { FC } from "react";
import { IField } from "./IField";
import "./Field.scss";
import { InputField } from "./InputField";
import { EMessages } from "@utils/EMessage";
import { Nullable } from "@app/config";

export const PasswordField: FC<IField> = ({ label = "", name, ...rest }) => {
    const MIN_LENGTH_PASSWORD = 6;

    const validatePasswordValue = (value: string = ""): Nullable<string> => {
        if (!value) {
            return;
        }
        if (value.length < MIN_LENGTH_PASSWORD) {
            return EMessages.PASSWORD_INCORRECT;
        }
        return;
    };

    return (
        <InputField
            label={label}
            type={"password"}
            name={name}
            placeholder={`Enter ${ label.toLowerCase()}`}
            validate={validatePasswordValue}
            {...rest}
        />
    );
};
