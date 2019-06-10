import { Store } from "@components/store";
import { IFieldError } from "@app/config/IFieldError";
import { EApiRoutes, TApiParams, TAxiosResponse } from "@services/transport";
import { ECarModelFields } from "./ECarModelFields";
import { action } from "mobx";
import { Nullable } from "@app/config";

export class CreateCarModelStore extends Store {
    private brandId?: string;

    @action.bound
    setBrandId(data: string): void {
        this.brandId = data;
    }

    getBrandId(): Nullable<string> {
        return this.brandId;
    }

    validateData(): IFieldError[] {
        return [
            { type: ECarModelFields.MODEL, codes: [] },
        ];
    }

    async createCarModel(data: TApiParams<EApiRoutes.CREATE_CAR_MODEL>, brandId: string): Promise<void> {
        return this.asyncCall(this.transport.createCarModel(data, brandId), this.onError).then(this.onCreateCarModel);
    }

    private onCreateCarModel(response: TAxiosResponse<EApiRoutes.CREATE_CAR_MODEL>): void {
        console.info("[CreateCarModelStore.onCreateCarModel]", response);
    }
}
