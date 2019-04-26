import * as React from "react";
import { FC } from "react";
import { IDropdownTrigger } from "./IDropdownTrigger";

export const DropdownTrigger: FC<IDropdownTrigger> = ({className, children, ...dropdownTriggerProps}) => {
    return (
        <a className={`dropdown__trigger ${className}`} {...dropdownTriggerProps}>
            {children}
        </a>
    );
};
