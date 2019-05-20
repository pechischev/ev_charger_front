import { IContextMenuItem } from "@components/context-menu";
import { ReactNode } from "react";
import * as React from "react";

export interface ITableData<T> {
    counter: number;
    item: T;
}

export enum EContentPositionType {
    LEFT = "left",
    CENTER = "center",
    RIGHT = "right"
}

export interface IColumn {
    id: string;
    label: string;
    position?: EContentPositionType;
    canSort?: boolean;
    cellClass?: string;
    size?: string;

    handler?(data?: any): ReactNode;
}

export enum ESortState {
    ASC = "asc",
    DESC = "desc",
}

export interface ITableHead {
    order?: ESortState;
    orderBy?: string;
    columns: IColumn[];
    contextItems?: any[];

    sortHandler(id: string): void;
}

export interface ITable<T> {
    columns: IColumn[];
    data: T[];

    rowsPerPage?: number;
    className?: string;
    canSelect?: boolean;
    totalCount?: number;
    showPagination?: boolean;
    contextItems?: IContextMenuItem[];

    optionHandler?(item: T): void;

    onChangePage?(page: number): void;
    onChangeSort?(property: string, orderBy: string): void;
    onClickRow?(item: T, event?: React.MouseEvent<HTMLElement>): void;
}
