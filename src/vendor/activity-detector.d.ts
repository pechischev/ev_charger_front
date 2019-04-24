declare module "activity-detector" {
    type TState = "idle" | "active";

    type TEvents =
        "click"  |
        "mousemove" |
        "keydown" |
        "DOMMouseScroll" |
        "mousewheel" |
        "mousedown" |
        "touchstart" |
        "touchmove" |
        "focus" |
        "blur";

    export interface IOptions {
        /**
         * @description Number of milliseconds of inactivity which makes
         * activity detector transition to 'idle' (30000 by default)
         */
        timeToIdle?: number;
        activityEvents?: TEvents[];
        inactivityEvents?: TEvents[];
        ignoredEventsWhenIdle?: TEvents[];
        initialState?: TState;
        autoInit?: boolean;
    }

    export interface IActivityDetector {
        on(event: string, cb: () => void): void;
        start(initialState: TState): void;
        stop(): void;
        init(): void;
    }

    export default function createActivityDetector(options: IOptions): IActivityDetector;
}
