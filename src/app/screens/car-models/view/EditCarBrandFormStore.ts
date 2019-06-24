import { Store } from "@components/store";
import { IFieldError } from "@app/config/IFieldError";
import { ECarBrandFields } from "@app/screens/car-brands/view";
import { EApiRoutes, TApiParams, TAxiosResponse } from "@services/transport";
import { Nullable } from "@app/config";
import * as _ from "lodash";
import { IItem } from "@entities/_common";

export class EditCarBrandFormStore extends Store {
    validateData(): IFieldError[] {
        return [
            { type: ECarBrandFields.BRAND, codes: [0, 260] },
        ];
    }

    transformData(data?: IItem): Nullable<TApiParams<EApiRoutes.VEHICLE_BRAND>> {
        if (!data || _.isEmpty(data)) {
            return void 0;
        }
        const {title} = data;
        return {title};
    }

    async updateCarBrand(data: TApiParams<EApiRoutes.VEHICLE_BRAND>): Promise<void> {
        return this.asyncCall(this.transport.updateVehicleBrand(data)).then(this.onCreateCarBrand);
    }

    private onCreateCarBrand(response: TAxiosResponse<EApiRoutes.VEHICLE_BRAND>): void {
        console.info("[CreateCarBrandStore.onCreateCarBrand]", response);
    }
}
