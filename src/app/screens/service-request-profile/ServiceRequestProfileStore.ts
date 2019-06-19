import { action, observable } from "mobx";
import * as _ from "lodash";
import { get, isEmpty, isNil } from "lodash";
import { Store } from "@components/store";
import { autobind } from "core-decorators";
import { Nullable } from "@app/config";
import { ERequestType, IServiceRequest } from "@entities/service-request";
import { EApiMethods, EApiRoutes, TAxiosResponse } from "@services/transport";
import { formattedDataTime } from "@utils";
import { redirectToServiceRequest } from "@utils/history";

@autobind
export class ServiceRequestProfileStore extends Store {
    @observable private data: IServiceRequest = _.stubObject();
    private requestId?: string;

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

    transformRequestData(data?: IServiceRequest): Nullable<object> {
        if (!data || isEmpty(data)) {
            return void 0;
        }
        const { user, contactData, request } = data;
        const { firstName, lastName } = user;
        const { address, city, aptUnit, state, residence } = contactData;
        const { type, sendingDate, resolved, subject, charger, message } = request;
        return {
            firstName,
            secondName: lastName,
            residence: get(residence, "title"),
            address: `${get(state, "title")} ${city} ${address} ${aptUnit}`,
            dateTime: formattedDataTime(sendingDate),
            subject,
            charger,
            comment: this.getMessageByRequestType(type, message),
            status: resolved ? "resolved" : "active",
        };
    }

    getServiceRequest(requestId: string): void {
        this.call(this.transport.getServiceRequest(requestId), this.onSuccessGetData, this.onError);
    }

    async updateServiceRequest(): Promise<void> {
        return this.asyncCall(
            this.transport.updateServiceRequest(_.toString(this.requestId)),
        ).then(this.onUpdateServiceRequest);
    }

    private getMessageByRequestType(type: ERequestType, message: string): string {
        if (!isNil(message)) {
            return message;
        }
        if (type === ERequestType.LOST_ACCESS) {
            return "The client wants to reissue cards";
        }
        if (type === ERequestType.CANCEL_SUBSCRIPTION) {
            return "Customer wants to cancel subscription in Loop";
        }
        return message;
    }

    private onSuccessGetData(response: TAxiosResponse<EApiRoutes.SERVICE_REQUEST, EApiMethods.GET>): void {
        console.info("[ServiceRequestProfileStore.onSuccessGetData]: ", response);
        const data = _.get<TAxiosResponse<EApiRoutes.SERVICE_REQUEST, EApiMethods.GET>, "data">(response, "data");
        this.setData(data);
    }

    private onUpdateServiceRequest(response: TAxiosResponse<EApiRoutes.SERVICE_REQUEST, EApiMethods.POST>): void {
        console.info("[ServiceRequestProfileStore.onUpdateServiceRequest]: ", response);
        redirectToServiceRequest();
    }

}
