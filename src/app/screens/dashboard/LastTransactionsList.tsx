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
import * as moment from "moment";
import * as React from "react";

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
                id: "nextPaymentDate", label: "Next due date", size: "0.75fr",
                handler: (item: TTransactionListItem) => {
                    const nextPaymentDate = moment(item.payDate * milliseconds).add({ month: 1 }).unix();
                    return formatDate(nextPaymentDate * milliseconds);
                },
            },
            {
                id: "status", label: "Status", size: "0.5fr",
                handler: (item: TTransactionListItem) => (
                    <span data-status={item.status}>{StatusMap.get(item.status)}</span>
                ),
            },
            {
                id: "amount", label: "Transaction cost", size: "0.75fr",
                handler: (item: TTransactionListItem) => (
                    `$ ${parseAmountFieldValue(item.amount.toString())}`
                ),
            },
            {
                id: "serviceFee", label: "Service Fee", size: "0.5fr",
                handler: (item: TTransactionListItem) => (
                    `$ ${parseAmountFieldValue(item.serviceFee.toString())}`
                ),
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
