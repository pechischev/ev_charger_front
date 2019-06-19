import { List } from "@components/list";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { IListParams } from "@services/transport/params";
import { IColumn } from "@components/table";
import { EApiRoutes, TAxiosResponse } from "@services/transport";
import { redirectOnTransactionProfile } from "@utils/history";
import { TTransactionListItem } from "@entities/transactions";
import { formatDate, parseAmountFieldValue } from "@utils";
import { StatusMap } from "@entities/user/EStatus";

@observer
@autobind
export class LastTransactionsList extends List<TTransactionListItem> {

    protected getColumns(): Array<IColumn<TTransactionListItem>> {
        const milliseconds = 1000;
        return [
            { id: "id", label: "Transaction Id", size: "0.5fr" },
            { id: "customer.id", label: "User Id", size: "100px" },
            { id: "customer.firstName", label: "Name" },
            { id: "customer.lastName", label: "Surname" },
            {
                id: "payDate", label: "Data transaction", size: "0.75fr",
                handler: (item: TTransactionListItem) => formatDate(item.payDate * milliseconds),
            },
            {
                id: "nextPaymentDate", label: "Date of resumption of payment", size: "0.75fr",
                handler: (item: TTransactionListItem) => formatDate(item.nextPaymentDate * milliseconds),
            },
            {
                id: "amount", label: "Transaction cost", size: "0.75fr",
                handler: (item: TTransactionListItem) => parseAmountFieldValue(`${item.amount}`),
            },
            {
                id: "status", label: "Status", size: "100px",
                handler: (item: TTransactionListItem) => StatusMap.get(item.status),
            },
        ];
    }

    protected onClickRow(item: TTransactionListItem): void {
        redirectOnTransactionProfile(item.id);
    }

    protected async getAction(params: IListParams): Promise<TAxiosResponse<EApiRoutes.GET_TRANSACTIONS>> {
        return this.store.transport.getTransactions(params);
    }

}
