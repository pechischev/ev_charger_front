import { SyntheticEvent } from "react";
import { positionValues } from "react-custom-scrollbars";
import { Subject } from "rxjs";

export interface ICustomScrollbarProps {
    autoHeightMax?: number | string;
    autoHide?: boolean;
    className?: string;
    updateScrollHeight$?: Subject<void>;
    showScroll$?: Subject<void>;
    id?: string;
    shouldScrollToRight?: boolean;

    onScrollUpdated?(values: positionValues): void;

    onScroll?(event: SyntheticEvent<HTMLElement>): void;

    scrollToRight?(value?: boolean): void;
}
