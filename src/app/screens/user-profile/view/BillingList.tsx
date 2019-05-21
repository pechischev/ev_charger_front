import { List } from "@components/list";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { IListParams } from "@services/transport/params";
import { IColumn } from "@components/table";
import { EApiRoutes, TAxiosResponse } from "@services/transport";
import { IFilter } from "@components/list/interfaces";

@observer
@autobind
export class BillingList extends List<object> {

    protected getFilterItems(): IFilter[] {
        return [];
    }

    protected getColumns(): Array<IColumn<object>> {
        return [
            {id: "date", label: "Date"},
            {id: "value", label: "Transaction value"},
            {id: "status", label: "Status"}
        ];
    }

    protected async getAction(params: IListParams): Promise<TAxiosResponse<EApiRoutes.GET_USERS>> {
        return new Promise((resolve) => resolve);
    }
}
