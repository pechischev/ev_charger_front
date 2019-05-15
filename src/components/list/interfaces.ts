import { ListStore } from "@components/list/ListStore";
import { ReactNode } from "react";

export interface IList<T> {
    canSearch?: boolean;
    actionElement?: ReactNode;
}

export interface IFilter {
    text: string;
    value?: string;
}

export interface IListActions<T> {
    filters: IFilter[];
    store: ListStore<T>;
    actionElement?: ReactNode;
    canSearch: boolean;
}
