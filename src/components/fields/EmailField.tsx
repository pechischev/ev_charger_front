import * as React from "react";
import { FC } from "react";
import { IField } from "./IField";
import "./Field.scss";
import { InputField } from "./InputField";
import { EMessages } from "@utils/EMessage";

// tslint:disable:max-line-length
const emailMask = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const EmailField: FC<IField> = ({ name, ...rest }) => {
    const validateEmailValue = (value: string): string => {
        if (!value) {
            return EMessages.EMPTY;
        }
        if (value.search(emailMask) === -1) {
            return EMessages.EMAIL_INCORRECT;
        }
        return "";
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
