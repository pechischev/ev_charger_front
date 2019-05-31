import * as React from "react";
import { FC, Fragment } from "react";
import { Field } from "react-final-form";
import { IField } from "@components/fields/IField";
import { getError } from "@utils";
import "./Field.scss";
import formatStringByPattern from "format-string-by-pattern";
import { isString } from "lodash";

export const InputField: FC<IField> = ({
        name, label, placeholder, mask, isVisible = true, disabled = false, type, parse, ...rest
    }) => {

    return (
        <div className="form-group" data-visible={isVisible}>
            <label className="form-label">{label}</label>
            <Field
                name={name}
                parse={(value, name) => {
                    if (parse) {
                        return parse(value, name);
                    }
                    if (isString(value)) {
                        return value.replace(/  +/g, " ");
                    }
                    return value;
                }}
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
                                <input
                                    className="form-control"
                                    disabled={disabled}
                                    {...props.input}
                                    {...{placeholder, type}}
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
