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
import { TTransactionListItem } from "@entities/transactions";
import { formatDate, parseAmountFieldValue } from "@utils";
import { StatusMap } from "@entities/user/EStatus";
import * as moment from "moment";

@observer
@autobind
export class TransactionsList extends List<TTransactionListItem> {

    protected getFilterItems(): IFilter[] {
        return [
            { text: "All", value: void 0 },
            { text: "Paid", value: EStatus.PAID },
            { text: "Overdue", value: EStatus.OVERDUE },
        ];
    }

    protected getColumns(): Array<IColumn<TTransactionListItem>> {
        return [
            { id: "id", label: "Transaction Id", size: "0.5fr" },
            { id: "customer.id", label: "User Id", size: "100px" },
            { id: "customer.firstName", label: "Name" },
            { id: "customer.lastName", label: "Surname" },
            {
                id: "payDate", label: "Data transaction", size: "0.75fr",
                handler: (item: TTransactionListItem) => formatDate(item.payDate * 1000),
            },
            {
                id: "nextPaymentDate", label: "Date of resumption of payment", size: "0.75fr",
                handler: (item: TTransactionListItem) => {
                    const nextPaymentDate = moment(item.payDate * 1000).add({month: 1}).unix();
                    return formatDate(nextPaymentDate * 1000);
                },
            },
            {
                id: "amount", label: "Transaction cost", size: "0.75fr",
                handler: (item: TTransactionListItem) => `$ ${parseAmountFieldValue(item.amount.toString())}`,
            },
            { id: "status", label: "Status", size: "100px",
                handler: (item: TTransactionListItem) => StatusMap.get(item.status)
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
