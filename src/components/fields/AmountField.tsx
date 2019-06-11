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
        if (!isNull(value.match(onlyLetterRegex)) || isNull(value.match(dataFormatRegex))) {
            return EMessages.AMOUNT_INCORRECT;
        }
        return void 0;
    };

    return (
        <InputField
            label={label}
            name={name}
            placeholder={placeholder}
            validate={validateAmountValue}
            {...rest}
        />
    );
};
