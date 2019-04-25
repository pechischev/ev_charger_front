import * as React from "react";

export interface IContextMenuItem {
    value: string;
    className?: string;
    preventClose?: boolean;

    handler(event: React.MouseEvent<HTMLDivElement>, data?: object): void;
}
