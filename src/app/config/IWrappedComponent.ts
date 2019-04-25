import { Nullable } from ".";

export interface IWrappedComponent {
    unwrap(): Nullable<any>;
}
