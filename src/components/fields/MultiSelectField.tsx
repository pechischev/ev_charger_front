import * as React from "react";
import { FC, Fragment } from "react";
import { IField } from "./IField";
import { Field, FieldRenderProps } from "react-final-form";
import Select from "react-select";
import { isArray } from "lodash";
import { IItem, IValueType } from "@entities/_common";
import { MultiValueProps } from "react-select/lib/components/MultiValue";
import { getError } from "@utils";

interface IMultiSelectField extends IField<HTMLSelectElement> {
    options: IItem[];
    disabled?: boolean;
}

const maxMenuHeight = 250;

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

export const MultiSelectField: FC<IMultiSelectField> = ({
                                                            name,
                                                            label,
                                                            placeholder,
                                                            type,
                                                            options = [],
                                                            disabled = false,
                                                            ...rest
                                                        }) => {
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
                        const { onChange, value, ...other } = props.input;
                        const onChangeValue = (option: IValueType[] | IValueType) => {
                            const optionValues = isArray(option) ? option : [option];
                            onChange(optionValues.map((optionValue) => optionValue.value) as any);
                        };
                        const values = !!value ? isArray(value) ? value : [value] : void 0;
                        const error = getError(props, type);
                        return (
                            <Fragment>
                                <Select
                                    {...other}
                                    isMulti={true}
                                    isSearchable={true}
                                    isDisabled={disabled || !options.length}
                                    maxMenuHeight={maxMenuHeight}
                                    placeholder={placeholder}
                                    options={convertValue(options)}
                                    value={convertValue(values)}
                                    components={{
                                        MultiValueContainer: renderValueContainer,
                                    }}
                                    onChange={onChangeValue}
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
