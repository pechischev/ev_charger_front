import { IField } from "@components/fields/IField";
import * as React from "react";
import { FC } from "react";
import { Field } from "react-final-form";
import { IItem } from "@entities/_common";

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
                    (props) => (
                        <select className="form-control" {...props.input} {...{ type }} disabled={!options.length}>
                            <option>{placeholder}</option>
                            {options.map((option, index) => (
                                <option value={option.id} key={index}>{option.title}</option>
                            ))}
                        </select>
                    )
                }
            </Field>
        </div>
    );
};
