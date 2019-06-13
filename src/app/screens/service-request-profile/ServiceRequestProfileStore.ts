import { action, observable } from "mobx";
import { Store } from "@components/store";
import * as _ from "lodash";
import { isEmpty } from "lodash";
import { autobind } from "core-decorators";
import { Nullable } from "@app/config";
import { ERequestType, IServiceRequest } from "@entities/service-request";
import { IFieldError } from "@app/config/IFieldError";
import { EServiceRequestFields } from "@app/screens/service-request-profile/types";
import { EApiRoutes, TApiParams } from "@services/transport";

@autobind
export class ServiceRequestProfileStore extends Store {
    @observable private data: IServiceRequest = _.stubObject();
    private requestId?: string;

    validateData(): IFieldError[] {
        const { requestType } = this.getData();
        const fields = [
            { type: EServiceRequestFields.FIRST_NAME, codes: [] },
            { type: EServiceRequestFields.SECOND_NAME, codes: [] },
            { type: EServiceRequestFields.RESIDENCE, codes: [] },
            { type: EServiceRequestFields.ADDRESS, codes: [] },
            { type: EServiceRequestFields.DATE_TIME, codes: [] },
            { type: EServiceRequestFields.COMMENT, codes: [] },
            { type: EServiceRequestFields.STATUS, codes: [] }
        ];
        if (requestType === ERequestType.BROKEN_CHARGER) {
            fields.push({ type: EServiceRequestFields.CHARGER_ID, codes: [] });
        }
        if (requestType === ERequestType.OTHER) {
            fields.push({ type: EServiceRequestFields.SUBJECT, codes: [] });
        }
        return fields;
    }

    @action.bound
    setData(data: IServiceRequest): void {
        this.data = data;
    }

    getData(): IServiceRequest {
        return this.data;
    }

    @action.bound
    setRequestId(data: string): void {
        this.requestId = data;
    }

    getRequestId(): Nullable<string> {
        return this.requestId;
    }

    transformRequestData(data?: IServiceRequest): Nullable<TApiParams<EApiRoutes.>> {
        if (!data || isEmpty(data)) {
            return void 0;
        }
        return data;
    }
}
