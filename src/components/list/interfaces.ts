import { ListStore } from "@components/list/ListStore";
import { ReactNode } from "react";
import { Subject } from "rxjs";

export interface IList<T> {
    step?: number;
    canSearch?: boolean;
    actionElement?: ReactNode;
    canDataSearch?: boolean;
    updateList$?: Subject<void>;
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
    canDataSearch?: boolean;
}
