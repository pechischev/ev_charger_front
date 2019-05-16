import {action, observable} from "mobx";
import { ETabsType } from "@components/tab";
import { Store } from "@components/store";
import { EApiMethods, EApiRoutes, TAxiosResponse } from "@services/transport";
import * as _ from "lodash";
import { autobind } from "core-decorators";
import { ICustomer } from "@entities/customer";
import { Nullable } from "@app/config";

@autobind
export class UserProfileStore extends Store {
    @observable private typeTab = ETabsType.CUSTOMER_PROFILE;
    @observable private data: ICustomer = _.stubObject();
    private userId?: string;

    setUserId(userId: string): void {
        this.userId = userId;
    }

    getUserId(): Nullable<string> {
        return this.userId;
    }

    @action.bound
    setTypeTab(type: ETabsType): void {
        this.typeTab = type;
    }

    getTypeTab(): ETabsType {
        return this.typeTab;
    }

    async getUserData(userId: string): Promise<void> {
        return this.asyncCall(this.transport.getUserData(userId), this.onError).then(this.onSuccessGetData);
    }

    @action.bound
    setData(data: ICustomer): void {
        this.data = data;
    }

    getData(): ICustomer {
        return this.data;
    }

    private onSuccessGetData(response: TAxiosResponse<EApiRoutes.USER_DATA, EApiMethods.GET>): void {
        console.info("[CustomerProfileStore.onSuccessGetData]: ", response);
        const data = _.get<TAxiosResponse<EApiRoutes.USER_DATA, EApiMethods.GET>, "data">(response, "data");
        this.setData(data);
    }
}
