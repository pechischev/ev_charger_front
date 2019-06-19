import { List } from "@components/list";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { IListParams } from "@services/transport/params";
import { IColumn } from "@components/table";
import { EApiRoutes, TAxiosResponse } from "@services/transport";
import { redirectOnTransactionProfile } from "@utils/history";
import { TTransactionListItem } from "@entities/transactions";
import { parseAmountFieldValue } from "@utils";

@observer
@autobind
export class LastTransactionsList extends List<TTransactionListItem> {

    protected getColumns(): Array<IColumn<TTransactionListItem>> {
        return [
            { id: "id", label: "Transaction Id", size: "0.5fr" },
            { id: "customer.id", label: "User Id", size: "100px" },
            { id: "customer.firstName", label: "Name" },
            { id: "customer.lastName", label: "Surname" },
            {
                id: "payDate", label: "Data transaction", size: "0.75fr",
                handler: (item: TTransactionListItem) => this.formatDate(item.payDate * 1000),
            },
            {
                id: "nextPaymentDate", label: "Date of resumption of payment", size: "0.75fr",
                handler: (item: TTransactionListItem) => this.formatDate(item.nextPaymentDate * 1000),
            },
            {
                id: "amount", label: "Transaction cost", size: "0.75fr",
                handler: (item: TTransactionListItem) => parseAmountFieldValue(`${item.amount}`),
            },
            { id: "status", label: "Status", size: "100px" },
        ];
    }

    protected onClickRow(item: TTransactionListItem): void {
        redirectOnTransactionProfile(item.id);
    }

    protected async getAction(params: IListParams): Promise<TAxiosResponse<EApiRoutes.GET_TRANSACTIONS>> {
        return this.store.transport.getTransactions(params);
    }

    private formatDate(value: number): string {
        const dateValue = new Date(value);
        return `${dateValue.getMonth()}/${dateValue.getDate()}/${dateValue.getFullYear()}`;
    }
}
