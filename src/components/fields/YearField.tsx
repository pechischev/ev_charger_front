import * as React from "react";
import { FC } from "react";
import { IField } from "./IField";
import "./Field.scss";
import { InputField } from "./InputField";
import { EMessages } from "@utils/EMessage";
import { formatValue } from "@utils";
import { Nullable } from "@app/config";

const YEAR_LENGTH = 4;

export const YearField: FC<IField> = ({ name, ...rest }) => {
    const validateYearValue = (value: string): Nullable<string> => {
        if (!value) {
            return void 0;
        }
        if (value.length !== YEAR_LENGTH) {
            return EMessages.YEAR_INCORRECT;
        }
        const minYear = 2000;
        const radix = 10;
        if (parseInt(value, radix) < minYear || parseInt(value, radix) > (new Date()).getFullYear()) {
            return (`Year can be from 2000 to ${(new Date()).getFullYear()}`);
        }
        if (isNaN(parseInt(value, radix))) {
            return EMessages.ONLY_NUMBER;
        }
        return void 0;
    };

    return (
        <InputField
            label={"Year"}
            name={name}
            placeholder={"Enter year"}
            mask={"9999"}
            validate={validateYearValue}
            parse={(value) => formatValue(value, YEAR_LENGTH + 1)}
            {...rest}
        />
    );
};
