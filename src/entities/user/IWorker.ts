import { IUser } from "./IUser";

export interface IWorker extends Pick<IUser, "id" | "firstName" | "lastName"> {
    //
}
