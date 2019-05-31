import * as React from "react";
import { FC } from "react";
import { IField } from "./IField";
import "./Field.scss";
import { InputField } from "./InputField";
import { EMessages } from "@utils/EMessage";
import { Nullable } from "@app/config";
import { isEmpty } from "lodash";

const MIN_LENGTH_PASSWORD = 6;

export const PasswordField: FC<IField> = ({ label = "", name, ...rest }) => {
    const validatePasswordValue = (value: string = ""): Nullable<string> => {
        if (!value) {
            return void 0;
        }
        if (value.length < MIN_LENGTH_PASSWORD || !isEmpty(value.match(/[^A-Za-z0-9-.]/))) {
            return EMessages.PASSWORD_INCORRECT;
        }
        return void 0;
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
