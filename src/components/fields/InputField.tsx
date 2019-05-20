import * as React from "react";
import { FC, Fragment } from "react";
import { Field } from "react-final-form";
import { IField } from "@components/fields/IField";
import { getError } from "@utils";
import "./Field.scss";
import formatStringByPattern from "format-string-by-pattern";


export const InputField: FC<IField> = ({name, label, placeholder, mask, type, ...rest}) => {

    return (
        <div className="form-group">
            <label className="form-label">{label}</label>
            <Field
                name={name}
                format={(value, name) => {
                    if (!mask) {
                        return value;
                    }
                    return formatStringByPattern(mask, value)
                }}
                {...rest}
            >
                {
                    (props) => {
                        const error = getError(props, type);
                        return (
                            <Fragment>
                                <input className="form-control" {...props.input} {...{placeholder, type}} />
                                <span className="form-text text-danger">{error}</span>
                            </Fragment>
                        );
                    }
                }
            </Field>
        </div>
    );
};
