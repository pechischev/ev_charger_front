import { FC } from "react";
import { Field } from "react-final-form";
import * as React from "react";
import { IField } from "@components/fields/IField";

export const InputField: FC<IField> = ({name, label, placeholder, type, ...rest}) => {
    return (
        <div className="form-group">
            <label className="form-label">{label}</label>
            <Field
                name={name}
                {...rest}
            >
                {
                    (props) => <input className="form-control" {...props.input} {...{placeholder, type}} />
                }
            </Field>
        </div>
    );
};
