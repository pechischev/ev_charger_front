import { action, observable } from "mobx";
import { Store } from "@components/store";
import { EApiMethods, EApiRoutes, TApiParams, TAxiosResponse } from "@services/transport";
import * as _ from "lodash";
import { autobind } from "core-decorators";
import { IResidence } from "@entities/residence";
import { IItem } from "@entities/_common";
import { IFieldError } from "@app/config/IFieldError";
import { EResidenceFieldTypes } from "@app/screens/add-residence/constants";
import { toNumber, get } from "lodash";

@autobind
export class ResidenceProfileStore extends Store {
    @observable private data: IResidence = _.stubObject();
    @observable private _operators: IItem[] = [];
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

    private onSuccessGetData(response: TAxiosResponse<EApiRoutes.RESIDENCE_DATA, EApiMethods.GET>): void {
        console.info("[ResidenceProfileStore.onSuccessGetData]: ", response);
        const data = _.get<TAxiosResponse<EApiRoutes.RESIDENCE_DATA, EApiMethods.GET>, "data">(response, "data");
        this.setData(data);
    }

    get operators(): IItem[] {
        return this._operators;
    }

    getOperators(): void {
        this.call(this.transport.getOperators(), this.onGetOperators, this.onError)
    }

    validateData(): IFieldError[] {
        return [
            { type: EResidenceFieldTypes.TITLE, codes: [] },
            { type: EResidenceFieldTypes.STATE, codes: [] },
            { type: EResidenceFieldTypes.CITY, codes: [] },
            { type: EResidenceFieldTypes.FIRST_ADDRESS, codes: [] },
            { type: EResidenceFieldTypes.SECOND_ADDRESS, codes: [] },
            { type: EResidenceFieldTypes.ZIP_CODE, codes: [] },
            { type: EResidenceFieldTypes.OPERATOR, codes: [] },
            { type: EResidenceFieldTypes.BILLING_RATE, codes: [] },
        ];
    }

    @action.bound
    private onGetOperators(response: TAxiosResponse<EApiRoutes.OPERATORS>): void {
        console.info("[AddResidenceStore.onGetOperators]", response);
        const operators = get<TAxiosResponse<EApiRoutes.OPERATORS>, "data">(response, "data");
        this._operators = operators.map(({id, firstName, lastName}) => ({id, title: `${firstName} ${lastName}`}));
    }

    async updateResidence(params: TApiParams<EApiRoutes.CREATE_RESIDENCE>): Promise<void> {
        const {stateId, operatorId, ...rest} = params;
        return this.asyncCall(this.transport.updateResidenceData({
            ...rest,
            stateId: toNumber(stateId),
            operatorId: toNumber(operatorId),
        }, this.residenceId), this.onError);
    }
}
