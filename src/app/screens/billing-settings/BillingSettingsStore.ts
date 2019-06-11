import { Store } from "@components/store";
import { IFieldError } from "@app/config/IFieldError";
import { autobind } from "core-decorators";
import { EApiMethods, EApiRoutes, TApiParams, TAxiosResponse } from "@services/transport";
import * as _ from "lodash";
import { get, isEmpty } from "lodash";
import { EBillingFieldType } from "./EBillingFieldType";
import { action, observable } from "mobx";
import { Nullable } from "@app/config";
import { redirectToSettings } from "@utils/history";
import { IBilling } from "@entities/billing-info";

@autobind
export class BillingSettingsStore extends Store {
    @observable private data: TApiParams<EApiRoutes.BILLING_SETTINGS> = _.stubObject();

    @action.bound
    setData(data: TApiParams<EApiRoutes.BILLING_SETTINGS>): void {
        this.data = data;
    }

    getData(): TApiParams<EApiRoutes.BILLING_SETTINGS> {
        return this.data;
    }

    transformCompanyData(data?: IBilling): Nullable<TApiParams<EApiRoutes.BILLING_SETTINGS>> {
        if (!data || isEmpty(data)) {
            return void 0;
        }
        return data;
    }

    validateData(): IFieldError[] {
        return [
            { type: EBillingFieldType.SERVICE_FEE, codes: [] },
        ];
    }

    async getBillingInfo(): Promise<void> {
        return this.asyncCall(this.transport.getBillingInfo()).then(this.onGetBillingInfo);
    }

    async updateBillingInfo(params: TApiParams<EApiRoutes.BILLING_SETTINGS>): Promise<void> {
        const { defaultSubscriptionValue } = params;
        return this.asyncCall(this.transport.updateBillingInfo(
            { defaultSubscriptionValue: parseFloat(`${defaultSubscriptionValue}`) },
        )).then(this.onUpdateBillingInfo);
    }

    private onUpdateBillingInfo(response: TAxiosResponse<EApiRoutes.BILLING_SETTINGS, EApiMethods.POST>): void {
        console.info("[BillingSettingsStore.onUpdateBillingInfo]", response);
        redirectToSettings();
    }

    private onGetBillingInfo(response: TAxiosResponse<EApiRoutes.BILLING_SETTINGS, EApiMethods.GET>): void {
        console.info("[BillingSettingsStore.onGetBillingInfo]", response);
        const data = get<TAxiosResponse<EApiRoutes.BILLING_SETTINGS, EApiMethods.GET>, "data">(response, "data");

        this.setData(data);
    }
}
