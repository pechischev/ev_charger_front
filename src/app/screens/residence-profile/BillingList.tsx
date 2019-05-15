import { IList, List } from "@components/list";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { IListParams } from "@services/transport/params";
import { IColumn } from "@components/table";
import { EApiRoutes, TAxiosResponse } from "@services/transport";
import * as React from "react";
import { IBillingListItem } from "@entities/residence";
import { toString } from "lodash";

interface IChargersListProps extends IList<IBillingListItem> {
    residenceId: number;
}


@observer
@autobind
export class BillingList extends List<IBillingListItem, IChargersListProps> {

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

    protected getAction(params: IListParams): Promise<TAxiosResponse<EApiRoutes.GET_RESIDENCE_CHARGES>> {
        const {residenceId} = this.props;
        return this.store.transport.getResidenceChargesData(params, toString(residenceId));
    }

    private viewReport(id: number) {
        // remove chargers request
        // this.updateList
    }
}
