import { MouseEvent } from "react";

export interface IButtonProps {
    className?: string;
    textContent?: string;
    disabled?: boolean;
    hidden?: boolean;

    onClick?(event: MouseEvent<HTMLDivElement>): void;
}
