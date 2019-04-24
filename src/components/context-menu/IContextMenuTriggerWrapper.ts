import { MouseEvent } from "react";

export interface IContextMenuTriggerWrapper {
    id: string;
    isVisible?: boolean;
    className?: string;
    data?: object;

    onContextMenu?(data?: object): void;

    setShowMenuHandler?(handler: (event: MouseEvent<HTMLElement>) => void): void;
}
