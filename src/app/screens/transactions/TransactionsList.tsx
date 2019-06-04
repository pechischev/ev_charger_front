import { EStatus } from "@entities/user";
import "./Transactions.scss";
import { List } from "@components/list";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { IListParams } from "@services/transport/params";
import { IColumn } from "@components/table";
import { EApiRoutes, TAxiosResponse } from "@services/transport";
import { IFilter } from "@components/list/interfaces";
import { redirectOnTransactionProfile } from "@utils/history";
import { ITransactionsListItem } from "@entities/transactions";

@observer
@autobind
export class TransactionsList extends List<ITransactionsListItem> {

    protected getFilterItems(): IFilter[] {
        return [
            { text: "All", value: void 0 },
            { text: "Active", value: EStatus.ACTIVE },
            { text: "Inactive", value: EStatus.INACTIVE },
        ];
    }

    protected getColumns(): Array<IColumn<ITransactionsListItem>> {
        return [
            { id: "a", label: "Transaction Id", size: "0.5fr" },
            { id: "b", label: "User Id", size: "100px" },
            { id: "c", label: "Name" },
            { id: "d", label: "Surname" },
            { id: "e", label: "Data transaction", size: "0.75fr" },
            { id: "t", label: "Date of resumption of payment", size: "0.75fr" },
            { id: "y", label: "Transaction cost", size: "0.75fr" },
            { id: "u", label: "Status", size: "100px" },
        ];
    }

    protected onClickRow(item: ITransactionsListItem): void {
        redirectOnTransactionProfile(item.id);
    }

    protected async getAction(params: IListParams): Promise<TAxiosResponse<EApiRoutes.GET_USERS>> {
        return this.store.transport.getUsers(params);
    }
}
