import { IUser } from "@entities/user";

export type TBaseUser = Pick<IUser, "email">;

export abstract class BaseUser {
    protected readonly email: string;

    protected constructor(params: TBaseUser) {
        this.email = params.email;
    }

    // noinspection JSUnusedGlobalSymbols
    abstract toJSON(): string;

    abstract toObject(): TBaseUser;
}
