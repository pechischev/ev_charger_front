import * as React from "react";
import { FC } from "react";
import { IField } from "./IField";
import "./Field.scss";
import { InputField } from "./InputField";
import { EMessages } from "@utils/EMessage";
import { toNumber } from "lodash";
import { Nullable } from "@app/config";
import { formatValue } from "@utils";

const MAX_ZIP_CODE_LENGTH = 5;

export const ZipCodeField: FC<IField> = ({ name, ...rest }) => {
    const validateZipCodeValue = (value: string): Nullable<string> => {
        if (!value) {
            return void 0;
        }
        if (value.length !== MAX_ZIP_CODE_LENGTH) {
            return EMessages.ZIP_CODE_INCORRECT;
        }
        if (isNaN(toNumber(value))) {
            return EMessages.ONLY_NUMBER;
        }
        return void 0;
    };

    return (
        <InputField
            label={"Zip code"}
            name={name}
            placeholder={"Enter zip code"}
            mask={"99999"}
            validate={validateZipCodeValue}
            parse={(value) => formatValue(value, MAX_ZIP_CODE_LENGTH + 1)}
            {...rest}
        />
    );
};
