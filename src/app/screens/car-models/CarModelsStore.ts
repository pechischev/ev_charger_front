import { Store } from "@components/store";
import { Subject } from "rxjs";
import { action, observable } from "mobx";
import { EApiMethods, EApiRoutes, TAxiosResponse } from "@services/transport";
import { toString, stubObject } from "lodash";
import { IItem } from "@entities/_common";
import * as _ from "lodash";
import { autobind } from "core-decorators";

@autobind
export class CarModelsStore extends Store {
    readonly updateChargerList$ = new Subject<void>();
    @observable private isOpenChargerPopup = false;
    @observable private data: IItem = stubObject();

    getVehicleBrand(brandId: string): void {
        this.call(this.transport.getVehicleBrand(brandId), this.onSuccessGetData, this.onError);
    }

    @action.bound
    setData(data: IItem): void {
        this.data = data;
    }

    getData(): IItem {
        return this.data;
    }

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
        console.info("[CarModelsStore.onRemovedCarBrand]: ", response);
    }

    private onSuccessGetData(response: TAxiosResponse<EApiRoutes.VEHICLE_BRAND, EApiMethods.GET>): void {
        console.info("[CarModelsStore.onSuccessGetData]: ", response);
        const data = _.get<TAxiosResponse<EApiRoutes.VEHICLE_BRAND, EApiMethods.GET>, "data">(response, "data");
        this.setData(data);
    }
}
