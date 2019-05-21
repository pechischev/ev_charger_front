import * as React from "react";
import { ReactNode, RefObject } from "react";
import { Subject } from "rxjs";

export interface IDropdownOption {
    divider?: boolean;
    value?: ReactNode | string;

    onClick?(event?: React.MouseEvent<HTMLElement>): void;
}

export interface IDropdownContent {
    className?: string;
    options: IDropdownOption[];
    contentRef?: RefObject<HTMLDivElement>;
    onClick$?: Subject<string>;
}
