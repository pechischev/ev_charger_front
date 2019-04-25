import { Nullable } from "@app/config";
import { Component } from "react";
import { Subject } from "rxjs";
import { JQueryStyleEventEmitter } from "rxjs/internal/observable/fromEvent";

export class SubscribableComponent<P = {}, S = {}> extends Component<P> implements JQueryStyleEventEmitter {
    private readonly subjects: Map<string, Subject<S>> = new Map<string, Subject<S>>();
    private readonly events: string[] = this.getEvents ? this.getEvents() : [];

    constructor(props: P) {
        super(props);
        this.events.forEach((event: string) => this.subjects.set(event, new Subject<S>()));
    }

    // tslint:disable-next-line:no-any
    on<F extends (value: any) => void>(eventName: string, handler: F): void {
        const subject = this.subjects.get(eventName);
        if (!subject) {
            return;
        }
        subject.subscribe(handler);
    }

    off(event: string): void {
        const subject = this.subjects.get(event);
        if (!subject) {
            return;
        }
        subject.unsubscribe();
    }

    next(event: string, value?: S): void {
        const subject = this.subjects.get(event);
        if (!subject) {
            return;
        }
        subject.next(value);
    }

    // noinspection JSUnusedGlobalSymbols
    getSubjectByEvent(eventName: string): Nullable<Subject<S>> {
        return this.subjects.get(eventName);
    }

    protected getEvents?(): string[];
}
