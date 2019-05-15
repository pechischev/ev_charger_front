import { EStatus } from "@entities/user";
import "./ResidencesList.scss";
import { List } from "@components/list";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { IListParams } from "@services/transport/params";
import { IColumn } from "@components/table";
import { EApiRoutes, TAxiosResponse } from "@services/transport";
import { IFilter } from "@components/list/interfaces";
import { IResidenceListItem } from "@entities/residence";

@observer
@autobind
export class ResidencesList extends List<IResidenceListItem> {

    protected getFilterItems(): IFilter[] {
        return [
            {text: "All", value: void 0},
            {text: "Active", value: EStatus.ACTIVE},
            {text: "Inactive", value: EStatus.INACTIVE},
        ]
    }

    protected getColumns(): IColumn[] {
        return [
            {id: "title", label: "Residence Name"},
            {
                id: "address",
                label: "Residence Address",
                handler: (item: IResidenceListItem) => this.getFullAddress(item)
            },
            {
                id: "operator.user.name",
                label: "Property Operator",
                handler: (item: IResidenceListItem) => this.getOperatorName(item)
            },
            {id: "chargersCount", label: "EV Chargers"},
            {id: "customerCount", label: "Active users"},
        ];
    }

    protected getAction(params: IListParams): Promise<TAxiosResponse<EApiRoutes.GET_RESIDENCES>> {
        return this.store.transport.getResidences(params);
    }

    private getFullAddress(item: IResidenceListItem): string {
        const {address = "", city = "", state, zipCode = ""} = item;
        return `${state.title} ${city} ${address} ${zipCode}`.trim();
    }

    private getOperatorName(item: IResidenceListItem): string {
        const {firstName = "", lastName = ""} = item.operator.user;
        return `${firstName} ${lastName}`.trim();
    }
}
