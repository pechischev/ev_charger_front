import { MouseEvent } from "react";

export interface IBreadcrumbProps {
    crumbs: IBreadcrumb[];
}

export interface IBreadcrumb {
    label: string;

    handler?(event: MouseEvent<HTMLElement>): void;
}
