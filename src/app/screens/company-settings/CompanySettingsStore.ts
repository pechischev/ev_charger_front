import { Store } from "@components/store";
import { IFieldError } from "@app/config/IFieldError";
import { autobind } from "core-decorators";
import { EApiMethods, EApiRoutes, TApiParams, TAxiosResponse } from "@services/transport";
import * as _ from "lodash";
import { get, isEmpty, toNumber } from "lodash";
import { ECompanyFieldType } from "./ECompanyFieldType";
import { action, observable } from "mobx";
import { ICompany } from "@entities/company";
import { Nullable } from "@app/config";
import { redirectToSettings } from "@utils/history";

@autobind
export class CompanySettingsStore extends Store {
    @observable private data: TApiParams<EApiRoutes.COMPANY_SETTINGS> = _.stubObject();

    @action.bound
    setData(data: TApiParams<EApiRoutes.COMPANY_SETTINGS>): void {
        this.data = data;
    }

    getData(): TApiParams<EApiRoutes.COMPANY_SETTINGS> {
        return this.data;
    }

    transformCompanyData(data?: ICompany): Nullable<TApiParams<EApiRoutes.COMPANY_SETTINGS>> {
        if (!data || isEmpty(data)) {
            return void 0;
        }
        return data;
    }

    validateData(): IFieldError[] {
        return [
            { type: ECompanyFieldType.TITLE, codes: [] },
            { type: ECompanyFieldType.ADDRESS, codes: [] },
            { type: ECompanyFieldType.STATE, codes: [] },
            { type: ECompanyFieldType.ZIP_CODE, codes: [] },
            { type: ECompanyFieldType.CITY, codes: [] },
            { type: ECompanyFieldType.PHONE, codes: [] },
            { type: ECompanyFieldType.EMAIL, codes: [] },
        ];
    }

    async getCompanyInfo(): Promise<void> {
        return this.asyncCall(this.transport.getCompanyInfo()).then(this.onGetCompanyInfo);
    }

    async updateCompanyInfo(params: TApiParams<EApiRoutes.COMPANY_SETTINGS>): Promise<void> {
        const { state, ...rest } = params;
        return this.asyncCall(this.transport.updateCompanyInfo({ ...rest, state: toNumber(state) }))
            .then(this.onUpdateCompanyInfo);
    }

    private onUpdateCompanyInfo(response: TAxiosResponse<EApiRoutes.COMPANY_SETTINGS, EApiMethods.POST>): void {
        console.info("[CompanySettingsStore.onUpdateCompanyInfo]", response);
        redirectToSettings();
    }

    private onGetCompanyInfo(response: TAxiosResponse<EApiRoutes.COMPANY_SETTINGS, EApiMethods.GET>): void {
        console.info("[CompanySettingsStore.onGetCompanyInfo]", response);
        const data = get<TAxiosResponse<EApiRoutes.COMPANY_SETTINGS, EApiMethods.GET>, "data">(response, "data");
        this.setData(data);
    }
}
