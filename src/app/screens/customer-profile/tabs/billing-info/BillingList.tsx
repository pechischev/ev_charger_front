import { List } from "@components/list";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { IListParams } from "@services/transport/params";
import { IColumn } from "@components/table";
import { EApiRoutes, TAxiosResponse } from "@services/transport";
import { IFilter } from "@components/list/interfaces";

@observer
@autobind
export class BillingList extends List<any> {

    protected getFilterItems(): IFilter[] {
        return [];
    }

    protected getColumns(): IColumn[] {
        return [
            {id: "date", label: "Date"},
            {id: "value", label: "Transaction value"},
            {id: "status", label: "Status"}
        ];
    }

    protected getAction(params: IListParams): Promise<TAxiosResponse<EApiRoutes.GET_USERS>> {
        return this.store.transport.getUsers(params);
    }
}
