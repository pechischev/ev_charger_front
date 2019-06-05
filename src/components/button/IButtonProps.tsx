import { HTMLProps, MouseEvent } from "react";

export interface IButtonProps extends HTMLProps<HTMLButtonElement> {
    className?: string;
    text?: string;
    disabled?: boolean;
    isBlock?: boolean;

    onClick?(event: MouseEvent<HTMLElement>): void;
}
