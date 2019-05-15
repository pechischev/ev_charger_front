import { action, observable } from "mobx";
import { Store } from "@components/store";
import { EApiMethods, EApiRoutes, TAxiosResponse } from "@services/transport";
import * as _ from "lodash";
import { autobind } from "core-decorators";
import { IResidence } from "@entities/residence";

@autobind
export class ResidenceProfileStore extends Store {
    @observable private data: IResidence = _.stubObject();
    private residenceId: number = 0;

    getResidenceData(residenceId: string): void {
        this.call(this.transport.getResidenceData(residenceId), this.onSuccessGetData, this.onError);
    }

    @action.bound
    setData(data: IResidence): void {
        this.data = data;
    }

    getData(): IResidence {
        return this.data;
    }

    @action.bound
    setResidenceId(data: number): void {
        this.residenceId = data;
    }

    getResidenceId(): number {
        return this.residenceId;
    }

    private onSuccessGetData(response: TAxiosResponse<EApiRoutes.GET_RESIDENCE_DATA, EApiMethods.GET>): void {
        console.info("[ResidenceProfileStore.onSuccessGetData]: ", response);
        const data = _.get<TAxiosResponse<EApiRoutes.GET_RESIDENCE_DATA, EApiMethods.GET>, "data">(response, "data");
        this.setData(data);
    }
}
