import { FC } from "react";
import { IField } from "./IField";
import { Nullable } from "@app/config";
import { isNull, head } from "lodash";
import { EMessages } from "@utils/EMessage";
import { InputField } from "./InputField";
import * as React from "react";

export const AmountField: FC<IField> = ({ name, placeholder, label, ...rest }) => {
    const validateAmountValue = (value: string): Nullable<string> => {
        if (!value) {
            return void 0;
        }

        if (!isNull(value.match(/[a-zA-Z]/g)) || isNull(value.match(/\d+[.,]\d{2}/g))) {
            return EMessages.AMOUNT_INCORRECT;
        }

        return void 0;
    };

    const parseAmountValue = (value: string): Nullable<string> => {
        if (!validateAmountValue(value)) {
            return head(/\d+[.,]\d{2}/g.exec(value) || []);
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
