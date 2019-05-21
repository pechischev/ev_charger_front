import { Store } from "@components/store";
import { autobind } from "core-decorators";
import { EApiRoutes, TAxiosResponse } from "@services/transport";
import { action, observable } from "mobx";
import { IItem } from "@entities/_common";
import { get, toString } from "lodash";

@autobind
export class InfoStore extends Store {
    @observable private _states: IItem[] = [];
    @observable private _residences: IItem[] = [];
    @observable private _makes: IItem[] = [];
    @observable private _models: IItem[] = [];

    get states(): IItem[] {
        return this._states;
    }

    get residences(): IItem[] {
        return this._residences;
    }

    get makes(): IItem[] {
        return this._makes;
    }

    get models(): IItem[] {
        return this._models;
    }

    getStates(): void {
        this.call(this.transport.getStates(), this.onGetStates, this.onError);
    }

    getResidences(): void {
        this.call(this.transport.getResidences(), this.onGetResidences, this.onError);
    }

    getMakes(): void {
        this.call(this.transport.getMakes(), this.onGetMakes, this.onError);
    }

    @action.bound
    getModels(makesId: number): void {
        this.call(this.transport.getModels(toString(makesId)), this.onGetModels, (err) => {
            this._models = [];
            return this.onError(err);
        });
    }

    @action.bound
    private onGetStates(response: TAxiosResponse<EApiRoutes.GET_STATES>): void {
        console.info("[InfoStore.onGetStates]", response);
        this._states = get<TAxiosResponse<EApiRoutes.GET_STATES>, "data">(response, "data");
    }

    @action.bound
    private onGetResidences(response: TAxiosResponse<EApiRoutes.GET_RESIDENCES>): void {
        console.info("[InfoStore.onGetResidences]", response);
        this._residences = get<TAxiosResponse<EApiRoutes.GET_RESIDENCES>, "data">(response, "data");
    }

    @action.bound
    private onGetMakes(response: TAxiosResponse<EApiRoutes.GET_MAKES>): void {
        console.info("[InfoStore.onGetMakes]", response);
        this._makes = get<TAxiosResponse<EApiRoutes.GET_MAKES>, "data">(response, "data");
    }

    @action.bound
    private onGetModels(response: TAxiosResponse<EApiRoutes.GET_MODELS>): void {
        console.info("[InfoStore.onGetModels]", response);
        this._models = get<TAxiosResponse<EApiRoutes.GET_MODELS>, "data">(response, "data");
    }
}
