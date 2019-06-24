import { IField } from "@components/fields/IField";
import * as React from "react";
import { FC, Fragment } from "react";
import { Field, FieldRenderProps } from "react-final-form";
import { IItem } from "@entities/_common";
import { isObject } from "lodash";
import "./Field.scss";
import { getError } from "@utils";

interface ISelectField extends IField<HTMLSelectElement> {
    options: IItem[];
}

export const SelectField: FC<ISelectField> = ({
    options = [], name, label, placeholder, isVisible = true, disabled, type, ...rest
                                               }) => {
    return (
        <div className="form-group" data-visible={isVisible}>
            <label className="form-label">{label}</label>
            <Field
                component={"select"}
                name={name}
                {...rest}
            >
                {
                    (props: FieldRenderProps<HTMLSelectElement>) => {
                        const value = isObject(props.input.value) ? (props.input.value as IItem).id : props.input.value;
                        const error = getError(props, type);
                        return (
                            <Fragment>
                                <select
                                    className="form-control"
                                    {...props.input}
                                    {...{ type, value }}
                                    disabled={!options.length || disabled}
                                >
                                    <option value="" style={{ display: "none" }}>{placeholder}</option>
                                    {options.map((option) => (
                                        <option value={option.id} key={option.id}>{option.title}</option>
                                    ))}
                                </select>
                                <span className="form-text text-danger">{error}</span>
                            </Fragment>
                        );
                    }
                }
            </Field>
        </div>
    );
};
