import * as React from "react";
import { FC } from "react";
import { IField } from "./IField";
import "./Field.scss";
import { InputField } from "./InputField";
import { EMessages } from "@utils/EMessage";
import { Nullable } from "@app/config";

// tslint:disable:max-line-length
const emailMask = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const EmailField: FC<IField> = ({ name, ...rest }) => {
    const validateEmailValue = (value: string): Nullable<string> => {
        if (!value) {
            return void 0;
        }
        if (value.search(emailMask) === -1) {
            return EMessages.EMAIL_INCORRECT;
        }
        return void 0;
    };

    return (
        <InputField
            label={"Email address"}
            name={name}
            placeholder={"Enter email"}
            validate={validateEmailValue}
            {...rest}
        />
    );
};
