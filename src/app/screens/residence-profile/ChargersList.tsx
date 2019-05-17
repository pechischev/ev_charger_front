import { IList, List } from "@components/list";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { IListParams } from "@services/transport/params";
import { IColumn } from "@components/table";
import { EApiRoutes, TAxiosResponse } from "@services/transport";
import * as React from "react";
import { IChargersListItem } from "@entities/residence";
import { Button } from "@components/button";

interface IChargersListProps extends IList<IChargersListItem> {
    residenceId?: string;
}

@observer
@autobind
export class ChargersList extends List<IChargersListItem, IChargersListProps> {

    protected getColumns(): IColumn[] {
        return [
            { id: "id", label: "Id" },
            { id: "model", label: "Model" },
            { id: "location", label: "Location" },
            {
                id: "action", label: "", size: "120px", handler: (item: IChargersListItem) => {
                    return (
                        <Button
                            type="delete"
                            onClick={() => this.deleteCharges(item.id)}
                            text="Delete"
                        />
                    );
                },
            },
        ];
    }

    protected getAction(params: IListParams): Promise<TAxiosResponse<EApiRoutes.RESIDENCE_CHARGES>> {
        const { residenceId } = this.props;
        if (!residenceId) {
            return new Promise((resolve) => resolve());
        }
        return this.store.transport.getResidenceChargesData(params, residenceId);
    }

    private deleteCharges(id: number) {
        // remove chareger request
        // this.updateList
    }
}
