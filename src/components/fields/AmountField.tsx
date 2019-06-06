import * as React from "react";
import { FC } from "react";
import { IField } from "./IField";
import "./Field.scss";
import { InputField } from "./InputField";
import { Nullable } from "@app/config";
import { head, isNull } from "lodash";
import { EMessages } from "@utils/EMessage";

export const AmountField: FC<IField> = ({ name, ...rest }) => {
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
            label="Amount"
            name={name}
            placeholder="Enter amount"
            validate={validateAmountValue}
            parse={parseAmountValue}
            {...rest}
        />
    );
};
