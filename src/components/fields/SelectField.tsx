import { IField } from "@components/fields/IField";
import * as React from "react";
import { FC } from "react";
import { Field, FieldProps } from "react-final-form";
import { IItem } from "@entities/_common";
import { isObject } from "lodash";

interface ISelectField extends IField<HTMLSelectElement> {
    options: IItem[];
}

export const SelectField: FC<ISelectField> = ({ options = [], name, label, placeholder, type, ...rest }) => {
    return (
        <div className="form-group">
            <label className="form-label">{label}</label>
            <Field
                component={"select"}
                name={name}
                {...rest}
            >
                {
                    (props: FieldProps<HTMLSelectElement>) => {
                        const value = isObject(props.input.value) ? props.input.value.id : props.input.value;
                        return (
                            <select className="form-control" {...props.input} {...{ type, value }} disabled={!options.length}>
                                <option>{placeholder}</option>
                                {options.map((option) => (
                                    <option value={option.id} key={option.id}>{option.title}</option>
                                ))}
                            </select>
                        );
                    }
                }
            </Field>
        </div>
    );
};
