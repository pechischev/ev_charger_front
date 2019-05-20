import { action, observable } from "mobx";
import { Store } from "@components/store";
import { EApiMethods, EApiRoutes, TApiParams, TAxiosResponse } from "@services/transport";
import * as _ from "lodash";
import { isEmpty } from "lodash";
import { autobind } from "core-decorators";
import { IFieldError } from "@app/config/IFieldError";
import { Nullable } from "@app/config";
import { IEmployee } from "@entities/company-employees";
import { EEmployeeFieldTypes } from "@app/components/employee-form";

@autobind
export class EmployeeProfileStore extends Store {
    @observable private data: IEmployee = _.stubObject();
    private employeeId?: string;

    getEmployee(employeeId: string): void {
        this.call(this.transport.getResidence(employeeId), this.onSuccessGetData, this.onError);
    }

    @action.bound
    setData(data: IEmployee): void {
        this.data = data;
    }

    getData(): IEmployee {
        return this.data;
    }

    @action.bound
    setEmployeeId(data: string): void {
        this.employeeId = data;
    }

    getEmployeeId(): Nullable<string> {
        return this.employeeId;
    }

    transformResidenceData(data?: IEmployee): Nullable<TApiParams<EApiRoutes.RESIDENCE_DATA>> {
        if (!data || isEmpty(data)) {
            return void 0;
        }
        return { data };
    }

    validateData(): IFieldError[] {
        return [
            { type: EEmployeeFieldTypes.FIRST_NAME, codes: [] },
            { type: EEmployeeFieldTypes.LAST_NAME, codes: [] },
            { type: EEmployeeFieldTypes.EMAIL, codes: [15] },
            { type: EEmployeeFieldTypes.PASSWORD, codes: [] },
            { type: EEmployeeFieldTypes.CONFIRM_PASSWORD, codes: [] },
            { type: EEmployeeFieldTypes.STATUS, codes: [] },
            { type: EEmployeeFieldTypes.STATUS, codes: [] },
            { type: EEmployeeFieldTypes.ROLE, codes: [] },
            { type: EEmployeeFieldTypes.RESIDENCES_LIST, codes: [] },
        ];
    }

    async updateEmployee(params: TApiParams<EApiRoutes.CREATE_EMPLOYEE>): Promise<void> {
        return this.asyncCall(this.transport.updateEmployee(params, this.employeeId), this.onError).then(this.onUpdateEmployeeData);
    }

    private onSuccessGetData(response: TAxiosResponse<EApiRoutes.EMPLOYEE_DATA, EApiMethods.GET>): void {
        console.info("[EmployeeProfileStore.onSuccessGetData]: ", response);
        const data = _.get<TAxiosResponse<EApiRoutes.EMPLOYEE_DATA, EApiMethods.GET>, "data">(response, "data");
        this.setData(data);
    }

    private onUpdateEmployeeData(response: TAxiosResponse<EApiRoutes.EMPLOYEE_DATA, EApiMethods.PUT>): void {
        console.info("[EmployeeProfileStore.onUpdateResidence]: ", response);
        const data = _.get<TAxiosResponse<EApiRoutes.EMPLOYEE_DATA, EApiMethods.PUT>, "data">(response, "data");
        this.setData(data);
    }

}
