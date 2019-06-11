import * as React from "react";
import { FC } from "react";
import { IField } from "./IField";
import "./Field.scss";
import { InputField } from "./InputField";
import { EMessages } from "@utils/EMessage";
import { formatValue } from "@utils";
import { Nullable } from "@app/config";

const MAX_PLATE_LENGTH = 10;

export const PromoCodeField: FC<IField> = ({ name, ...rest }) => {
    const validatePromoCodeValue = (value: string): Nullable<string> => {
        if (!value) {
            return void 0;
        }
        if (value.length > MAX_PLATE_LENGTH) {
            return EMessages.PROMO_CODE_INCORRECT;
        }
        return void 0;
    };

    return (
        <InputField
            label={"Promo code"}
            name={name}
            placeholder={"Enter promo code"}
            mask={"AAAAAAAAAA"}
            validate={validatePromoCodeValue}
            parse={(value) => formatValue(value, MAX_PLATE_LENGTH + 1)}
            {...rest}
        />
    );
};
