import * as React from "react";
import { FC } from "react";
import { IField } from "./IField";
import "./Field.scss";
import { InputField } from "./InputField";
import { Nullable } from "@app/config";
import { formatValue } from "@utils";

const MAX_COUNT_DIGITS_PHONE = 7;

export const DataField: FC<IField> = ({ label = "", placeholder = "MM/DD/YY", name, ...rest }) => {
    const validateDataValue = (value: string): Nullable<string> => {
        return void 0;
    };

    return (
        <InputField
            label={label}
            name={name}
            placeholder={placeholder}
            mask={"AA/AA/AA"}
            validate={validateDataValue}
            parse={(value) => formatValue(value, MAX_COUNT_DIGITS_PHONE + 1)}
            {...rest}
        />
    );
};
