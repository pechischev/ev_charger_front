import * as React from "react";
import { FC } from "react";
import { IField } from "./IField";
import "./Field.scss";
import { InputField } from "./InputField";
import { EMessages } from "@utils/EMessage";


export const YearField: FC<IField> = ({ name, ...rest }) => {
    const validateYearValue = (value: string) => {
        if (!value) {
            return EMessages.EMPTY;
        }
        if (value.length !== 4) {
            return EMessages.YEAR_INCORRECT;
        }
        if (parseInt(value, 10) < 2000 || parseInt(value, 10) > (new Date()).getFullYear()) {
            return ("Year can be from 2000 to " + (new Date()).getFullYear());
        }
        if (isNaN(parseInt(value, 10))) {
            return EMessages.ONLY_NUMBER;
        }
        return "";
    };

    const formatYear = (value: string) => {
        if (!value) {
            return value;
        }
        if (value.length === 5) {
            value = value.substring(0, value.length - 1)
        }
        return value;
    };

    return (
        <InputField
            label={ "Year" }
            name={ name }
            placeholder={ "Enter year" }
            mask={ "9999" }
            validate={ (value) => validateYearValue(value) }
            parse={ (value) => {
                return formatYear(value);
            }}
            {...rest}
        />
    );
};
