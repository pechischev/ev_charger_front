import { Store } from "@components/store";
import { Subject } from "rxjs";
import { action, observable } from "mobx";
import { EApiMethods, EApiRoutes, TAxiosResponse } from "@services/transport";
import { toString } from "lodash";
import { autobind } from "core-decorators";

@autobind
export class CarBrandsStore extends Store {
    readonly updateBrandList$ = new Subject<void>();
    @observable private isOpenChargerPopup = false;

    @action.bound
    setCarBrandPopupState(isOpenChargerPopup: boolean): void {
        this.isOpenChargerPopup = isOpenChargerPopup;
    }

    getCarBrandPopupState(): boolean {
        return this.isOpenChargerPopup;
    }

    async removeCarBrand(brandId: number): Promise<void> {
        return this.asyncCall(this.transport.removeVehicleBrand(toString(brandId)))
            .then(this.onRemovedCarBrand);
    }

    private onRemovedCarBrand(response: TAxiosResponse<EApiRoutes.VEHICLE_BRAND, EApiMethods.DELETE>): void {
        console.info("[CarBrandsStore.onRemovedCarBrand]: ", response);
    }
}
