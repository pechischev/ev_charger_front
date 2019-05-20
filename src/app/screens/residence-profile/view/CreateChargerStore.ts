import { Store } from "@components/store";
import { IFieldError } from "@app/config/IFieldError";
import { EChargerFieldTypes } from "@app/components/charger-form";
import { EApiRoutes, TApiParams, TAxiosResponse } from "@services/transport";

export class CreateChargerStore extends Store {
    validateData(): IFieldError[] {
        return [
            { type: EChargerFieldTypes.BRAND, codes: [] },
            { type: EChargerFieldTypes.MODEL, codes: [] },
            { type: EChargerFieldTypes.SERIAL_NUMBER, codes: [] },
            { type: EChargerFieldTypes.LOCATION, codes: [] },
        ];
    }

    async createCharger(data: TApiParams<EApiRoutes.CREATE_CHARGER>, residenceId?: string): Promise<void> {
        if (!residenceId) {
            return;
        }
        return this.asyncCall(this.transport.createCharger(data, residenceId), this.onError).then(this.onCreateCharger);
    }

    private onCreateCharger(response: TAxiosResponse<EApiRoutes.CREATE_CHARGER>): void {
        console.info("[CreateChargerStore.onCreateCharger]", response);
    }
}
