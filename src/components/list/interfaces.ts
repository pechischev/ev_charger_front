import { ListStore } from "@components/list/ListStore";

export interface IList<T> {
    canSearch?: boolean;
}

export interface IFilter {
    text: string;
    value?: string;
}

export interface IListActions<T> {
    filters: IFilter[];
    store: ListStore<T>;
    canSearch: boolean;
}
