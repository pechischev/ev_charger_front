import { IList, List } from "@components/list";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { IListParams } from "@services/transport/params";
import { IColumn } from "@components/table";
import { IBillingListItem } from "@entities/residence";
import { parseAmountFieldValue } from "@utils";
import { IListResponse } from "@services/transport/responses";
import { AxiosResponse } from "axios";

interface IBillingListProps extends IList<IBillingListItem> {
    residenceId?: string;
}

@autobind
@observer
export class BillingList extends List<IBillingListItem, IBillingListProps> {

    protected getColumns(): Array<IColumn<IBillingListItem>> {
        return [
            {
                id: "date", label: "Date",
                handler: (item: IBillingListItem) => this.formatDate(item.date),
            },
            {
                id: "successful", label: "Successful transactions",
                handler: (item: IBillingListItem) => parseAmountFieldValue(item.successful.toString()),
            },
            {
                id: "unsuccessful", label: "Unsuccessful transactions",
                handler: (item: IBillingListItem) => parseAmountFieldValue(item.unsuccessful.toString()),
            },
            {
                id: "totalAmount", label: "Total Revenue",
                handler: (item: IBillingListItem) => parseAmountFieldValue(item.totalAmount.toString()),
            },
            {
                id: "totalServiceFee", label: "Service Fee",
                handler: (item: IBillingListItem) => parseAmountFieldValue(item.totalServiceFee.toString()),
            },
            {
                id: "revenue", label: "Net Revenue",
                handler: (item: IBillingListItem) => parseAmountFieldValue(item.revenue.toString()),
            },
        ];
    }

    protected async getAction(params: IListParams): Promise<AxiosResponse<IListResponse<IBillingListItem>>> {
        const { residenceId } = this.props;
        if (!residenceId) {
            return new Promise((resolve) => resolve());
        }
        const {data, ...rest} = await this.store.transport.getBillingHistory(params, residenceId);
        return {data: {count: data.length, rows: data}, ...rest};
    }

    private formatDate(value: number): string {
        const TIMESTAMP_COEFFICIENT = 1000;
        const dateValue = new Date(value * TIMESTAMP_COEFFICIENT);
        return `${dateValue.getMonth()}/${dateValue.getDate()}/${dateValue.getFullYear()}`;
    }
}
