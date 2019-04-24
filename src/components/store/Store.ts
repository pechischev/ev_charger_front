import { IError } from "@entities/error";
import { IErrorResponse, Transport } from "@services/transport";
import { AxiosError, AxiosResponse } from "axios";
import { attempt, get } from "lodash";
import { observable } from "mobx";
import { Subject } from "rxjs";
import { autobind } from "core-decorators";

@autobind
export class Store {
    private readonly _error$ = new Subject<IError[]>();

    private _transport = new Transport();

    get transport(): Transport {
        return this._transport;
    }

    set transport(value: Transport) {
        this._transport = value;
    }

    get error$(): Subject<IError[]> {
        return this._error$;
    }

    @observable
    private _isCorrectData = false;

    get isCorrectData(): boolean {
        return this._isCorrectData;
    }

    set isCorrectData(value: boolean) {
        this._isCorrectData = value;
    }

    /** @deprecated Use getter! */
    getTransport(): Transport {
        return this._transport;
    }

    /** @deprecated Use promises! */
    call<T extends AxiosResponse>(
        promise: Promise<T>,
        onSuccess: (response: T) => void,
        onError: (err: AxiosError) => void,
    ): void {
        if (!this._transport) {
            return;
        }
        promise.then(onSuccess).catch(onError);
    }

    /** @deprecated Use promises! */
    async asyncCall<T extends AxiosResponse>(promise: Promise<T>, onError?: (err: AxiosError) => void): Promise<T> {
        return promise.catch(async (error: AxiosError) => {
            if (onError) {
                onError(error);
            } else {
                this.onError(error);
            }
            return Promise.reject(error);
        });
    }

    onError(error: AxiosError): void {
        console.error("[Store.onError]", error);
        attempt(this.onErrorImpl!);
        const response = error.response as AxiosResponse<IErrorResponse>;
        if (!response) {
            return;
        }
        const data = get<AxiosResponse<IErrorResponse>, "data">(response, "data");
        const errors = get<AxiosResponse<IErrorResponse>["data"], "errors">(data, "errors");
        this._error$.next(errors || []);
    }

    protected onErrorImpl?(): void;
}
