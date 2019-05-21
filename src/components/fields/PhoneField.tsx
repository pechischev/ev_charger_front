import * as React from "react";
import { FC } from "react";
import { IField } from "./IField";
import "./Field.scss";
import { InputField } from "./InputField";
import { EMessages } from "@utils/EMessage";


export const PhoneField: FC<IField> = ({ name, ...rest }) => {
    const validatePhoneValue = (value: string) => {
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

    const formatPhoneValue = (value: string) => {
        if (!value) {
            return value;
        }
        value = value.replace(/[^\d]/g, "");
        if (value.length === 12) {
            value = value.substring(0, value.length - 1);
        }
        return value;
    };

    return (
        <InputField
            label={"Phone number"}
            name={name}
            placeholder={"Enter phone"}
            mask={"+9 (999) 999 99-99"}
            validate={(value) => validatePhoneValue(value)}
            parse={(value) => formatPhoneValue(value)}
            {...rest}
        />
    );
};
