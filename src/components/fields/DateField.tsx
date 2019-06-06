import * as React from "react";
import { FC } from "react";
import { IField } from "./IField";
import "./Field.scss";
import { InputField } from "./InputField";
import { Nullable } from "@app/config";
import { formatValue } from "@utils";

const MAX_LENGTH = 8;

export const DateField: FC<IField> = ({ label = "", placeholder = "MM/DD/YY", name, ...rest }) => {
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
            parse={(value) => formatValue(value, MAX_LENGTH + 1)}
            {...rest}
        />
    );
};
