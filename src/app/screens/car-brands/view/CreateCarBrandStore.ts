import { Store } from "@components/store";
import { IFieldError } from "@app/config/IFieldError";
import { EApiRoutes, TApiParams, TAxiosResponse } from "@services/transport";
import { ECarBrandFields } from "./ECarBrandFields";

export class CreateCarBrandStore extends Store {
    validateData(): IFieldError[] {
        return [
            { type: ECarBrandFields.BRAND, codes: [] },
        ];
    }

    async createCarBrand(data: TApiParams<EApiRoutes.CREATE_CAR_BRAND>): Promise<void> {
        return this.asyncCall(this.transport.createCarBrand(data), this.onError).then(this.onCreateCarBrand);
    }

    private onCreateCarBrand(response: TAxiosResponse<EApiRoutes.CREATE_CAR_BRAND>): void {
        console.info("[CreateCarBrandStore.onCreateCarBrand]", response);
    }
}
