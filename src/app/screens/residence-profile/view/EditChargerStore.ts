import { Store } from "@components/store";
import { IFieldError } from "@app/config/IFieldError";
import { EChargerFieldTypes } from "@app/components/charger-form";
import { EApiMethods, EApiRoutes, TApiParams, TAxiosResponse } from "@services/transport";
import { ICharger } from "@entities/residence";
import { Nullable } from "@app/config";
import * as _ from "lodash";

export class EditChargerStore extends Store {
    validateData(): IFieldError[] {
        return [
            { type: EChargerFieldTypes.BRAND, codes: [] },
            { type: EChargerFieldTypes.MODEL, codes: [] },
            { type: EChargerFieldTypes.SERIAL_NUMBER, codes: [] },
            { type: EChargerFieldTypes.LOCATION, codes: [] },
        ];
    }

    transformChargerData(data?: ICharger): Nullable<TApiParams<EApiRoutes.CHARGER, EApiMethods.PUT>> {
        if (!data || _.isEmpty(data)) {
            return void 0;
        }
        const {residenceId, ...rest} = data;
        return rest;
    }

    async updateCharger(data: TApiParams<EApiRoutes.CHARGER, EApiMethods.PUT>, residenceId?: string): Promise<void> {
        if (!residenceId) {
            return;
        }
        return this.asyncCall(this.transport.updateCharger(data, residenceId), this.onError).then(this.onUpdateCharger);
    }

    private onUpdateCharger(response: TAxiosResponse<EApiRoutes.CHARGER, EApiMethods.PUT>): void {
        console.info("[EditChargerStore.onUpdateCharger]", response);
    }
}
