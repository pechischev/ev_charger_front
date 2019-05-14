import { IColumn } from "@components/table";
import { IListParams } from "@services/transport/params";
import { Subject } from "rxjs";

export interface IList<T> {
    columns: IColumn[];

    updateList$: Subject<void>;

    getList(data: IListParams): Promise<any>;

    onChangeSelectionItem?(item: T): void;
}
