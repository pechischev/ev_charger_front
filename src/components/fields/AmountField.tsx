import * as React from "react";
import { FC } from "react";
import { IField } from "./IField";
import "./Field.scss";
import { InputField } from "./InputField";
import { Nullable } from "@app/config";
import { head } from "lodash";
import { EMessages } from "@utils/EMessage";

export const AmountField: FC<IField> = ({ name, ...rest }) => {
    const validateAmountValue = (value: string): Nullable<string> => {
        if (!value) {
            return void 0;
        }
        if (!/[a-zA-Z]/g.exec(value)) {
            return EMessages.AMOUNT_INCORRECT;
        }
        return void 0;
    };

    const parseAmountValue = (value: string): Nullable<string> => {
        if (!value) {
            return void 0;
        }

        return head(/\d+[.,]\d{2}/g.exec(value) || []);
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
