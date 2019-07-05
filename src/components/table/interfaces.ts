import { IContextMenuItem } from "@components/context-menu";
import * as React from "react";
import { ReactNode } from "react";

export interface ITableData<T> {
    counter: number;
    item: T;
}

export enum EContentPositionType {
    LEFT = "left",
    CENTER = "center",
    RIGHT = "right"
}

export interface IColumn<T> {
    id: string;
    label: string;
    position?: EContentPositionType;
    canSort?: boolean;
    cellClass?: string;
    size?: string;
    isSum?: boolean;

    handler?(data?: T): ReactNode;
}

export enum ESortState {
    ASC = "asc",
    DESC = "desc",
}

export interface ITableHead<T> {
    order?: ESortState;
    orderBy?: string;
    columns: Array<IColumn<T>>;
    contextItems?: object[];

    sortHandler(id: string): void;
}

export interface ITable<T> {
    columns: Array<IColumn<T>>;
    data: T[];

    rowsPerPage?: number;
    className?: string;
    canSelect?: boolean;
    isSum?: boolean;
    totalCount?: number;
    showPagination?: boolean;
    contextItems?: IContextMenuItem[];

    optionHandler?(item: T): void;

    onChangePage?(page: number): void;

    onChangeSort?(property: string, orderBy: string): void;

    onClickRow?(item: T, event?: React.MouseEvent<HTMLElement>): void;
}
