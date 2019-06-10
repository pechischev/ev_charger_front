import { Store } from "@components/store";
import { Subject } from "rxjs";
import { action, observable } from "mobx";
import { EApiMethods, EApiRoutes, TAxiosResponse } from "@services/transport";

export class CarModelsStore extends Store {
    readonly updateChargerList$ = new Subject<void>();
    @observable private isOpenChargerPopup = false;

    @action.bound
    setCarBrandPopupState(isOpenChargerPopup: boolean): void {
        this.isOpenChargerPopup = isOpenChargerPopup;
    }

    getCarBrandPopupState(): boolean {
        return this.isOpenChargerPopup;
    }

    async removeCarBrand(brandId: number): Promise<void> {
        return this.asyncCall(this.transport.removeCarBrand(toString(brandId)))
            .then(this.onRemovedCarBrand);
    }

    private onRemovedCarBrand(response: TAxiosResponse<EApiRoutes.CAR_BRAND, EApiMethods.DELETE>): void {
        console.info("[CarModelsStore.onRemovedCarBrand]: ", response);
    }
}
