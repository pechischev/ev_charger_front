import * as React from "react";
import { FC } from "react";
import { IField } from "./IField";
import "./Field.scss";
import { InputField } from "./InputField";
import { EMessages } from "@utils/EMessage";
import { Nullable } from "@app/config";
import { formatValue } from "@utils";

const MAX_COUNT_DIGITS_PHONE = 11;

export const PhoneField: FC<IField> = ({ name, ...rest }) => {
    const validatePhoneValue = (value: string): Nullable<string> => {
        if (!value) {
            return void 0;
        }
        const phone = value.replace(/[^\d]/g, "");
        if (phone.length !== MAX_COUNT_DIGITS_PHONE || phone.charAt(0) !== "1") {
            return EMessages.PHONE_LENGTH;
        }
        const radix = 10;
        if (isNaN(parseInt(phone, radix))) {
            return EMessages.ONLY_NUMBER;
        }
        return void 0;
    };

    const formatPhoneValue = (value: string): string => {
        if (!value) {
            return value;
        }
        const digits = value.replace(/[^\d]/g, "");
        return formatValue(digits, MAX_COUNT_DIGITS_PHONE + 1);
    };

    return (
        <InputField
            label={"Phone number"}
            name={name}
            placeholder={"Enter phone"}
            mask={"(999) 999 99-99"}
            validate={validatePhoneValue}
            parse={formatPhoneValue}
            {...rest}
        />
    );
};
