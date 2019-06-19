import { Store } from "@components/store";
import { action, observable, toJS } from "mobx";
import * as _ from "lodash";
import { LineSerieData } from "@nivo/line";
import { EApiRoutes, TAxiosResponse } from "@services/transport";
import { IStatisticDataResponse } from "@services/transport/responses";
import * as moment from "moment";

export class DashboardStore extends Store {
    @observable private data: LineSerieData[] = [];
    @observable private statistics: IStatisticDataResponse = _.stubObject();

    getData(): LineSerieData[] {
        return toJS(this.data);
    }

    isExistData(): boolean {
        if (_.isEmpty(this.data)) {
            return false;
        }
        const newData = this.data.filter(item => !_.isEmpty(item.data));
        if (this.data.length !== newData.length) {
            return false;
        }
        return true;
    }

    getStatisticsData(): IStatisticDataResponse {
        return this.statistics;
    }

    getStatistics(): void {
        this.asyncCall(this.transport.getStatistics())
            .then(this.onGetStatistics);
    }

    getReportData(): void {
        this.asyncCall(this.transport.getReportData())
            .then(this.onGetReportData);
    }

    @action.bound
    private onGetStatistics(response: TAxiosResponse<EApiRoutes.STATISTICS>): void {
        console.info("[DashboardStore.onGetStatistics]", response);
        this.statistics = _.get<TAxiosResponse<EApiRoutes.STATISTICS>, "data">(response, "data");
    }

    @action.bound
    private onGetReportData(response: TAxiosResponse<EApiRoutes.REPORT_DATA>): void {
        console.info("[DashboardStore.onGetReportData]", response);
        const data = _.get<TAxiosResponse<EApiRoutes.REPORT_DATA>, "data">(response, "data");
        const residenceData = [];
        const userData = [];
        for (const value of data) {
            const { date, residenceCount, userCount } = value;
            const month = moment(date * 1000).format("MMMM");
            residenceData.push({ x: month, y: residenceCount });
            userData.push({ x: month, y: userCount });
        }
        this.data = [
            { id: "New residences", data: residenceData },
            { id: "New users", data: userData },
        ];
    }
}
