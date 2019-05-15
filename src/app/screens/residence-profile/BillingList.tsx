import { List } from "@components/list";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { IListParams } from "@services/transport/params";
import { IColumn } from "@components/table";
import { EApiRoutes, TAxiosResponse } from "@services/transport";
import * as React from "react";
import { IBillingListItem } from "@entities/residence";

@observer
@autobind
export class BillingList extends List<IBillingListItem> {

    protected getColumns(): IColumn[] {
        return [
            {id: "", label: "Date"},
            {id: "user.firstName", label: "First name"},
            {id: "user.lastName", label: "Last name"},
            {id: "", label: "Successful transactions"},
            {id: "", label: "Unsuccessful transactions"},
            {id: "", label: "Total Revenue"},
            {id: "", label: "Service Fee"},
            {id: "", label: "Net Revenue"},
            {
                id: "", label: "", handler: (item: IBillingListItem) => {
                    return (
                        <button
                            className="btn btn-secondary btn-block"
                            onClick={() => this.viewReport(item.id)}
                        >
                            View Billing Report
                        </button>
                    );
                }
            },
        ];
    }

    protected getAction(params: IListParams & { residentId: string },): Promise<TAxiosResponse<EApiRoutes.GET_RESIDENCE_CHARGES>> {
        const {residentId, ...rest} = params;
        return this.store.transport.getResidenceChargesData(rest, residentId);
    }

    private viewReport(id: number) {
        // remove chareger request
        // this.updateList
    }
}
