import { Store } from "@components/store";
import { IFieldError } from "@app/config/IFieldError";
import { autobind } from "core-decorators";
import { EApiMethods, EApiRoutes, TApiParams, TAxiosResponse } from "@services/transport";
import * as _ from "lodash";
import { get, toNumber } from "lodash";
import { redirectToResidenceList } from "@utils/history";
import { EResidenceFieldTypes } from "@app/components/residence-form";
import { action, observable } from "mobx";
import { IResidence } from "@entities/residence";

@autobind
export class AddResidenceStore extends Store {
    @observable private billingData: TApiParams<EApiRoutes.BILLING_SETTINGS> = _.stubObject();

    @action.bound
    setBillingData(data: TApiParams<EApiRoutes.BILLING_SETTINGS>): void {
        this.billingData = data;
    }

    getBillingData(): TApiParams<EApiRoutes.BILLING_SETTINGS> {
        return this.billingData;
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
        ];
    }

    async createResidence(params: IResidence): Promise<void> {
        const { stateId, operatorId, billingRate, serviceFee, ...rest } = params;
        return this.asyncCall(this.transport.createResidence({
            ...rest,
            billingRate: parseFloat(`${billingRate}`),
            serviceFee: parseFloat(`${serviceFee}`),
            stateId: toNumber(stateId),
            operatorId: toNumber(operatorId),
        }), this.onError).then(this.onCreateResidence);
    }

    async getBillingInfo(): Promise<void> {
        return this.asyncCall(this.transport.getBillingInfo()).then(this.onGetBillingInfo);
    }

    private onCreateResidence(response: TAxiosResponse<EApiRoutes.CREATE_RESIDENCE>): void {
        console.info("[AddResidenceStore.onCreateResidence]", response);
        redirectToResidenceList();
    }

    private onGetBillingInfo(response: TAxiosResponse<EApiRoutes.BILLING_SETTINGS, EApiMethods.GET>): void {
        console.info("[BillingSettingsStore.onGetBillingInfo]", response);
        const data = get<TAxiosResponse<EApiRoutes.BILLING_SETTINGS, EApiMethods.GET>, "data">(response, "data");

        this.setBillingData(data);
    }
}
