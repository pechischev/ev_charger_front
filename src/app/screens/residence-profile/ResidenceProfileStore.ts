import { action, observable } from "mobx";
import { Store } from "@components/store";
import { EApiMethods, EApiRoutes, TAxiosResponse } from "@services/transport";
import * as _ from "lodash";
import { get, isEmpty, toNumber, toString } from "lodash";
import { autobind } from "core-decorators";
import { ICharger, IResidence, IResidenceForm } from "@entities/residence";
import { IFieldError } from "@app/config/IFieldError";
import { EResidenceFieldTypes } from "@app/components/residence-form";
import { Nullable } from "@app/config";
import { Subject } from "rxjs";
import { parseAmountFieldValue } from "@utils";

@autobind
export class ResidenceProfileStore extends Store {
    static readonly ROWS_PER_PAGE = 5;
    readonly updateChargerList$ = new Subject<void>();
    @observable private data: IResidence = _.stubObject();
    @observable private charger: ICharger = _.stubObject();
    @observable private isOpenChargerPopup = false;
    private residenceId?: string;

    getResidence(residenceId: string): void {
        this.call(this.transport.getResidence(residenceId), this.onSuccessGetData, this.onError);
    }

    @action.bound
    setData(data: IResidence): void {
        this.data = data;
    }

    getData(): IResidence {
        return this.data;
    }

    @action.bound
    setResidenceId(data: string): void {
        this.residenceId = data;
    }

    getResidenceId(): Nullable<string> {
        return this.residenceId;
    }

    @action.bound
    setChargerPopupState(isOpenChargerPopup: boolean): void {
        this.isOpenChargerPopup = isOpenChargerPopup;
    }

    getChargerPopupState(): boolean {
        return this.isOpenChargerPopup;
    }

    getCharger(): ICharger {
        return this.charger;
    }

    transformResidenceData(data?: IResidence): Nullable<IResidenceForm> {
        if (!data || isEmpty(data)) {
            return void 0;
        }
        const { id, title, state, city, address, extraAddress, billingRate, operator, zipCode, serviceFee, ...rest } = data;
        return {
            title, city, address, extraAddress, zipCode,
            billingRate: parseAmountFieldValue(`${billingRate}`),
            serviceFee: parseAmountFieldValue(`${serviceFee}`),
            operatorId: toNumber(get(operator, "id")),
            stateId: toNumber(get(state, "id")),
            ...rest,
        };
    }

    validateData(): IFieldError[] {
        return [
            { type: EResidenceFieldTypes.TITLE, codes: [] },
            { type: EResidenceFieldTypes.STATE, codes: [] },
            { type: EResidenceFieldTypes.CITY, codes: [] },
            { type: EResidenceFieldTypes.ADDRESS, codes: [] },
            { type: EResidenceFieldTypes.ZIP_CODE, codes: [] },
            { type: EResidenceFieldTypes.OPERATOR, codes: [] },
            { type: EResidenceFieldTypes.BILLING_RATE, codes: [] },
            { type: EResidenceFieldTypes.SERVICE_FEE, codes: [] },
            { type: EResidenceFieldTypes.STATUS, codes: [] },
        ];
    }

    async removeCharger(chargerId: number): Promise<void> {
        if (!this.residenceId) {
            return;
        }
        return this.asyncCall(this.transport.removeCharger(this.residenceId, toString(chargerId)))
            .then(this.onRemovedCharger);
    }

    async getChargerData(chargerId: number): Promise<void> {
        if (!this.residenceId) {
            return;
        }
        return this.asyncCall(this.transport.getCharger(this.residenceId, toString(chargerId)))
            .then(this.onGetChargerData);
    }

    async updateResidence(params: IResidenceForm): Promise<void> {
        const { stateId, operatorId, billingRate, serviceFee, ...rest } = params;
        return this.asyncCall(this.transport.updateResidence({
            ...rest,
            billingRate: parseFloat(`${billingRate}`),
            serviceFee: parseFloat(`${serviceFee}`),
            stateId: toNumber(stateId),
            operatorId: toNumber(operatorId),
        }, this.residenceId as string), this.onError).then(this.onUpdateResidence);
    }

    private onSuccessGetData(response: TAxiosResponse<EApiRoutes.RESIDENCE_DATA, EApiMethods.GET>): void {
        console.info("[ResidenceProfileStore.onSuccessGetData]: ", response);
        const data = _.get<TAxiosResponse<EApiRoutes.RESIDENCE_DATA, EApiMethods.GET>, "data">(response, "data");
        this.setData(data);
    }

    private onUpdateResidence(response: TAxiosResponse<EApiRoutes.RESIDENCE_DATA, EApiMethods.PUT>): void {
        console.info("[ResidenceProfileStore.onUpdateResidence]: ", response);
        const data = _.get<TAxiosResponse<EApiRoutes.RESIDENCE_DATA, EApiMethods.PUT>, "data">(response, "data");
        this.setData(data);
    }

    @action.bound
    private onGetChargerData(response: TAxiosResponse<EApiRoutes.CHARGER, EApiMethods.GET>): void {
        console.info("[ResidenceProfileStore.onGetChargerData]: ", response);
        this.charger = _.get<TAxiosResponse<EApiRoutes.CHARGER, EApiMethods.GET>, "data">(response, "data");
    }

    private onRemovedCharger(response: TAxiosResponse<EApiRoutes.CHARGER, EApiMethods.DELETE>): void {
        console.info("[ResidenceProfileStore.onRemovedCharger]: ", response);
    }
}
