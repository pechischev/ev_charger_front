import * as React from "react";
import { FC, Fragment } from "react";
import { IField } from "./IField";
import { Field, FieldRenderProps } from "react-final-form";
import Select from "react-select";
import { isArray } from "lodash";
import { IItem, IValueType } from "@entities/_common";
import { MultiValueProps } from "react-select/lib/components/MultiValue";
import { getError } from "@utils";
import { StylesConfig } from "react-select/lib/styles";

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

const renderValueContainer = ({ children, className }: MultiValueProps<IValueType>) => (
    <div className="multi-value-container">
        {children}
    </div>
);

const customStyles: StylesConfig = {
    menu: (provided) => ({
        ...provided,
        marginTop: 0,
    }),
    menuList: (provided) => ({
        ...provided,
        paddingTop: 0,
        paddingBottom: 0,
    }),
    option: (provided) => ({
        ...provided,
        width: "calc(100% - 1px)",
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        fontSize: 14,
        lineHeight: "18px",
    }),
};

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
                            onChange(optionValues.filter((optionValue) => !!optionValue).map((optionValue) => optionValue.value) as any);
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
                                    className="multiSelect-field"
                                    styles={customStyles}
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
