import * as React from "react";
import { FC } from "react";
import { IField } from "./IField";
import "./Field.scss";
import { InputField } from "./InputField";
import { EMessages } from "@utils/EMessage";

export const PhoneField: FC<IField> = ({ name, ...rest }) => {
    const validatePhoneValue = (value: string): string => {
        if (!value) {
            return EMessages.EMPTY;
        }
        const phone = value.replace(/[^\d]/g, "");
        if (phone.length !== 11 || phone.charAt(0) !== "1") {
            return EMessages.PHONE_LENGTH;
        }
        if (isNaN(parseInt(phone, 10))) {
            return EMessages.ONLY_NUMBER;
        }
        return "";
    };

    const formatPhoneValue = (value: string): string => {
        if (!value) {
            return value;
        }
        const digits = value.replace(/[^\d]/g, "");
        if (digits.length === 12) {
            return digits.substring(0, digits.length - 1);
        }
        return digits;
    };

    return (
        <InputField
            label={"Phone number"}
            name={name}
            placeholder={"Enter phone"}
            mask={"+9 (999) 999 99-99"}
            validate={validatePhoneValue}
            parse={formatPhoneValue}
            {...rest}
        />
    );
};
