import { Store } from "@components/store";
import { IFieldError } from "@app/config/IFieldError";
import { autobind } from "core-decorators";
import { EApiRoutes, TApiParams, TAxiosResponse } from "@services/transport";
import * as _ from "lodash";
import { isEmpty, toNumber } from "lodash";
import { redirectToCompanyInfoSettings } from "@utils/history";
import { ECompanyFieldType } from "./ECompanyFieldType";
import { action, observable } from "mobx";
import { ICompany } from "@entities/company";
import { Nullable } from "@app/config";

@autobind
export class CompanySettingsStore extends Store {
    @observable private data: ICompany = _.stubObject();

    @action.bound
    setData(data: ICompany): void {
        this.data = data;
    }

    getData(): ICompany {
        return this.data;
    }

    transformCompanyData(data?: ICompany): Nullable<TApiParams<EApiRoutes.COMPANY_SETTINGS>> {
        if (!data || isEmpty(data)) {
            return void 0;
        }
        const { companyName, state, city, address, extraAddress, zipCode } = data;
        return {
            ...{ companyName, city, address, extraAddress, zipCode },
            stateId: state.id,
        };
    }

    validateData(): IFieldError[] {
        return [
            { type: ECompanyFieldType.TITLE, codes: [] },
            { type: ECompanyFieldType.ADDRESS, codes: [] },
            { type: ECompanyFieldType.EXTRA_ADDRESS, codes: [] },
            { type: ECompanyFieldType.STATE, codes: [] },
            { type: ECompanyFieldType.ZIP_CODE, codes: [] },
            { type: ECompanyFieldType.CITY, codes: [] },
            { type: ECompanyFieldType.PHONE, codes: [] },
            { type: ECompanyFieldType.EMAIL, codes: [] },
        ];
    }

    async updateCompanyInfo(params: TApiParams<EApiRoutes.COMPANY_SETTINGS>): Promise<void> {
        const { stateId, operatorId, ...rest } = params;
        return this.asyncCall(this.transport.createResidence({
            ...rest,
            stateId: toNumber(stateId),
            operatorId: toNumber(operatorId),
        }), this.onError).then(this.updateCompany);
    }

    private updateCompany(response: TAxiosResponse<EApiRoutes.COMPANY_SETTINGS>): void {
        console.info("[CompanySettingsStore.updateCompany]", response);
        redirectToCompanyInfoSettings();
    }
}
