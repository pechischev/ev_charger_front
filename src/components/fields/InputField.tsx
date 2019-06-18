import * as React from "react";
import { FC, Fragment, ReactText } from "react";
import { Field } from "react-final-form";
import { IField } from "@components/fields/IField";
import { getError } from "@utils";
import "./Field.scss";
import formatStringByPattern from "format-string-by-pattern";
import { isEmpty, isString } from "lodash";
import { Nullable } from "@app/config";
import { EMessages } from "@utils/EMessage";

export const InputField: FC<IField> = ({
    name, label, placeholder, mask, isVisible = true, disabled = false, type, validate, ...rest
                                       }) => {
    const validateField = (value: ReactText, allValues: object): Nullable<ReactText> => {
        if (validate) {
            return validate(value, allValues);
        }
        const onlyWords = /^[\w+_.,]+( [\w_.,]+)*$/g;
        if (isString(value) && isEmpty(value.trim().match(onlyWords))) {
            return EMessages.CONTAINS_INVALID_VALUE;
        }
        return void 0;
    };
    return (
        <div className="form-group" data-visible={isVisible}>
            <label className="form-label">{label}</label>
            <Field
                name={name}
                validate={validateField}
                format={(value) => {
                    if (!mask) {
                        if (isString(value)) {
                            return value.replace(/\s+/g, " ");
                        }
                        return value;
                    }
                    return formatStringByPattern(mask, value);
                }}
                {...rest}
            >
                {
                    (props) => {
                        const error = getError(props, type);
                        return (
                            <Fragment>
                                <input
                                    className="form-control"
                                    disabled={disabled}
                                    {...props.input}
                                    {...{ placeholder, type }}
                                />
                                <span className="form-text text-danger">{error}</span>
                            </Fragment>
                        );
                    }
                }
            </Field>
        </div>
    );
};
