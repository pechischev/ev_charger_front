import { IList, List } from "@components/list";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { IListParams } from "@services/transport/params";
import { IColumn } from "@components/table";
import { EApiRoutes, TAxiosResponse } from "@services/transport";
import * as React from "react";
import { IChargersListItem } from "@entities/residence";
import { toString } from "lodash";

interface IChargersListProps extends IList<IChargersListItem> {
    residenceId: number;
}

@observer
@autobind
export class ChargersList extends List<IChargersListItem, IChargersListProps> {

    protected getColumns(): IColumn[] {
        return [
            {id: "id", label: "Id"},
            {id: "model", label: "Model"},
            {id: "location", label: "Location"},
            {
                id: "", label: "", handler: (item: IChargersListItem) => {
                    return (
                        <button
                            className="btn btn-secondary btn-block"
                            onClick={() => this.deleteCharges(item.id)}
                        >
                            Delete
                        </button>
                    );
                }
            }
        ];
    }

    protected getAction(params: IListParams): Promise<TAxiosResponse<EApiRoutes.GET_RESIDENCE_CHARGES>> {
        const {residenceId} = this.props;
        return this.store.transport.getResidenceChargesData(params, toString(residenceId));
    }

    private deleteCharges(id: number) {
        // remove chareger request
        // this.updateList
    }
}
