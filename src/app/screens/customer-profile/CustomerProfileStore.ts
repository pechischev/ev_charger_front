import {action, observable} from "mobx";
import { ETabsType } from "@components/tab";
import { Store } from "@components/store";
import { EApiMethods, EApiRoutes, TAxiosResponse } from "@services/transport";
import * as _ from "lodash";
import { autobind } from "core-decorators";
import { ICustomer } from "@entities/customer";

@autobind
export class CustomerProfileStore extends Store {
    @observable private typeTab = ETabsType.CUSTOMER_PROFILE;
    @observable private data: ICustomer = _.stubObject();

    @action.bound
    setTypeTab(type: ETabsType): void {
        this.typeTab = type;
    }

    getTypeTab(): ETabsType {
        return this.typeTab;
    }

    getUserData(userId: string): void {
        this.call(this.transport.getUserData(userId), this.onSuccessGetData, this.onError);
    }

    @action.bound
    setData(data: ICustomer): void {
        this.data = data;
    }

    getData(): ICustomer {
        return this.data;
    }

    private onSuccessGetData(response: TAxiosResponse<EApiRoutes.GET_USER_DATA, EApiMethods.GET>): void {
        console.info("[CustomerProfileStore.onSuccessGetData]: ", response);
        const data = _.get<TAxiosResponse<EApiRoutes.GET_USER_DATA, EApiMethods.GET>, "data">(response, "data");
        this.setData(data);
    }
}
