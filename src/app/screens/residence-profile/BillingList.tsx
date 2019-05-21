import { IList, List } from "@components/list";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { IListParams } from "@services/transport/params";
import { IColumn } from "@components/table";
import { EApiRoutes, TAxiosResponse } from "@services/transport";
import * as React from "react";
import { IBillingListItem } from "@entities/residence";
import { Button } from "@components/button";

interface IChargersListProps extends IList<IBillingListItem> {
    residenceId?: string;
}

@observer
@autobind
export class BillingList extends List<IBillingListItem, IChargersListProps> {

    protected getColumns(): Array<IColumn<IBillingListItem>> {
        return [
            { id: "", label: "Date" },
            { id: "user.firstName", label: "First name" },
            { id: "user.lastName", label: "Last name" },
            { id: "", label: "Successful transactions" },
            { id: "", label: "Unsuccessful transactions" },
            { id: "", label: "Total Revenue" },
            { id: "", label: "Service Fee" },
            { id: "", label: "Net Revenue" },
            {
                id: "", label: "", size: "185px", handler: (item: IBillingListItem) => {
                    return (
                        <Button
                            type="secondary"
                            onClick={() => this.viewReport(item.id)}
                            text="View Billing Report"
                        />
                    );
                },
            },
        ];
    }

    protected async getAction(params: IListParams): Promise<TAxiosResponse<EApiRoutes.RESIDENCE_CHARGES>> {
        const { residenceId } = this.props;
        if (!residenceId) {
            return new Promise((resolve) => resolve());
        }
        return this.store.transport.getResidenceChargesData(params, residenceId);
    }

    private viewReport(id: number): void {
        // remove chargers request
        // this.updateList
    }
}
