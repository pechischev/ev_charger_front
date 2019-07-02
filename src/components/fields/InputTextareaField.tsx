import * as React from "react";
import { FC, Fragment, ReactText } from "react";
import { Field } from "react-final-form";
import { IField } from "@components/fields/IField";
import { getError } from "@utils";
import "./Field.scss";
import formatStringByPattern from "format-string-by-pattern";
import { Nullable } from "@app/config";
import * as autosize from "autosize";

export const InputTextareaField: FC<IField> = ({
        name, label, placeholder, mask, isVisible = true, disabled = false, type, validate, ...rest
    }) => {
    const validateField = (value: ReactText, allValues: object): Nullable<ReactText> => {
        if (validate) {
            return validate(value, allValues);
        }
        return void 0;
    };

    const field = document.querySelector(`textarea[name=${name}]`);
    if (!!field) {
        autosize(field);
    }

    return (
        <div className="form-group form-group_textarea" data-visible={isVisible}>
            <label className="form-label">{label}</label>
            <Field
                name={name}
                validate={validateField}
                format={(value) => {
                    if (!mask) {
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
                                <textarea
                                    className="form-control"
                                    disabled={disabled}
                                    {...props.input}
                                    {...{ placeholder, type }}
                                >
                                    {...props.input.value}
                                </textarea>
                                <span className="form-text text-danger">{error}</span>
                            </Fragment>
                        );
                    }
                }
            </Field>
        </div>
    );
};
