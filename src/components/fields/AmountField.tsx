import * as React from "react";
import { FC } from "react";
import { IField } from "./IField";
import { Nullable } from "@app/config";
import { isNull } from "lodash";
import { EMessages } from "@utils/EMessage";
import { InputField } from "./InputField";

export const AmountField: FC<IField> = ({ name, placeholder, label, ...rest }) => {

    const dataFormatRegex = /\d+[.,]\d{2}/g;
    const onlyLetterRegex = /[a-zA-Z]/g;

    const validateAmountValue = (value: string): Nullable<string> => {
        if (!value) {
            return void 0;
        }
        if (!isNull(`${value}`.match(onlyLetterRegex)) || isNull(value.toString().match(dataFormatRegex))) {
            return EMessages.AMOUNT_VALUE_FORMAT_INCORRECT;
        }
        return void 0;
    };

    const parseAmountValue = (value: string): Nullable<string> => {
        if (!value) {
            return void 0;
        }
        if (value === "0") {
            return "0.00";
        }
        const arr = value.split(".");
        const endNumberLength = 2;
        if (arr.length === 1) {
            return `${arr[0]}.00`;
        }
        if (arr[1].length === 0) {
            return `${arr[0]}.00`;
        }
        if (arr[1].length === 1) {
            return `${arr[0]}.${arr[1]}0`;
        }
        if (arr[1].length === endNumberLength) {
            return `${arr[0]}.${arr[1]}`;
        }
        const findingValue = value.match(dataFormatRegex);
        if (!!findingValue) {
            return findingValue[0];
        }
        return value;
    };

    return (
        <InputField
            label={label}
            name={name}
            placeholder={placeholder}
            validate={validateAmountValue}
            parse={parseAmountValue}
            {...rest}
        />
    );
};
