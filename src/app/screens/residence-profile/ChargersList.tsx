import { List } from "@components/list";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { IListParams } from "@services/transport/params";
import { IColumn } from "@components/table";
import { EApiRoutes, TAxiosResponse } from "@services/transport";
import * as React from "react";
import { IChargersListItem } from "@entities/residence";

@observer
@autobind
export class ChargersList extends List<IChargersListItem> {

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

    protected getAction(params: IListParams & { residentId: string },): Promise<TAxiosResponse<EApiRoutes.GET_RESIDENCE_CHARGES>> {
        const {residentId, ...rest} = params;
        return this.store.transport.getResidenceChargesData(rest, residentId);
    }

    private deleteCharges(id: number) {
        // remove chareger request
        // this.updateList
    }
}
