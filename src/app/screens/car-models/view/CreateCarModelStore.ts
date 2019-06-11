import { Store } from "@components/store";
import { IFieldError } from "@app/config/IFieldError";
import { EApiRoutes, TAxiosResponse } from "@services/transport";
import { ECarModelFields } from "./ECarModelFields";
import { action } from "mobx";
import { IItem } from "@entities/_common";
import { autobind } from "core-decorators";
import { toNumber } from "lodash";

@autobind
export class CreateCarModelStore extends Store {
    private brandId?: number;

    @action.bound
    setBrandId(data: string): void {
        this.brandId = toNumber(data);
    }

    validateData(): IFieldError[] {
        return [
            { type: ECarModelFields.MODEL, codes: [] },
        ];
    }

    async createCarModel(data: Pick<IItem, "title">): Promise<void> {
        if (!this.brandId) {
            return;
        }
        const { title } = data;
        return this.asyncCall(this.transport.createVehicleModel({
            title,
            brandId: this.brandId,
        }), this.onError).then(this.onCreateCarModel);
    }

    private onCreateCarModel(response: TAxiosResponse<EApiRoutes.CREATE_VEHICLE_MODEL>): void {
        console.info("[CreateCarModelStore.onCreateCarModel]", response);
    }
}
