import { FC, Fragment } from "react";
import { Field } from "react-final-form";
import * as React from "react";
import { IField } from "@components/fields/IField";
import { getError } from "@utils";

export const InputField: FC<IField> = ({name, label, placeholder, type, ...rest}) => {

    return (
        <div className="form-group">
            <label className="form-label">{label}</label>
            <Field
                name={name}
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
