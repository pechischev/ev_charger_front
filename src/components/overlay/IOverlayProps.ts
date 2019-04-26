import { RefObject } from "react";

export interface IOverlayProps {
    className?: string;
    overlayName: string;
    readOnly?: boolean;
    optionsRef?: RefObject<HTMLDivElement>;

    onShow?(): void;

    onHide?(): void;
}
