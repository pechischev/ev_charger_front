import * as React from "react";
import { FC, Fragment } from "react";
import { IField } from "./IField";
import { Field, FieldRenderProps } from "react-final-form";
import Select from "react-select";
import { isArray } from "lodash";
import { IItem, IValueType } from "@entities/_common";
import { MultiValueProps } from "react-select/lib/components/MultiValue";

interface IMultiSelectField extends IField<HTMLSelectElement> {
    options: IItem[];
}

const maxMenuHeight = 250;

export const MultiSelectField: FC<IMultiSelectField> = ({ name, label, placeholder, options = [], ...rest }) => {
    return (
        <div className="form-group">
            <label className="form-label">{label}</label>
            <Field
                name={name}
                multiple={true}
                {...rest}
            >
                {
                    (props: FieldRenderProps<HTMLElement>) => {
                        const { onChange, ...other } = props.input;
                        const onChangeValue = (option: IValueType[] | IValueType) => {
                            const options = isArray(option) ? option : [option];
                            onChange(options as any);
                        };
                        return (
                            <Select
                                {...other}
                                isMulti={true}
                                isSearchable={true}
                                isDisabled={!options.length}
                                maxMenuHeight={maxMenuHeight}
                                placeholder={placeholder}
                                options={convertValue(options)}
                                components={{
                                    MultiValueContainer: renderValueContainer,
                                }}
                                onChange={onChangeValue}
                            />
                        );
                    }
                }
            </Field>
        </div>
    );
};

const convertValue = (options: IItem[] = []): IValueType[] => {
    return options.map((option) => ({
            label: option.title,
            value: option,
        }),
    );
};

const renderValueContainer = ({ children }: MultiValueProps<IValueType>) => (
    <Fragment>
        {children}
    </Fragment>
);
