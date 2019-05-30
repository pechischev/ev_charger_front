import { Store } from "@components/store";
import { autobind } from "core-decorators";
import { toString } from "lodash";
import { EApiRoutes, TAxiosResponse } from "@services/transport";

@autobind
export class WorkersStore extends Store {
    async removeWorker(workerId: number): Promise<void> {
        return this.asyncCall(this.transport.removeWorker(toString(workerId))).then(this.onRemoveWorker);
    }

    private onRemoveWorker(response: TAxiosResponse<EApiRoutes.WORKER_DATA>): void {
        console.info("[WorkersStore.onRemoveWorker]", response);
    }
}
