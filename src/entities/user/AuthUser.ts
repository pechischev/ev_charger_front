import { IAuthUser } from "./IAuthUser";

export class AuthUser  {
    private readonly roles: string[] = [];
    private readonly id: number;
    private readonly lastName: string;
    private readonly firstName: string;
    private readonly email: string;

    constructor(params: IAuthUser) {
        this.id = params.id;
        this.firstName = params.firstName;
        this.lastName = params.lastName;
        this.roles = params.roles;
        this.email = params.email;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @throws TypeError
     */
    toJSON(): string {
        return JSON.stringify(this.getObject());
    }
    /**
     * @throws SyntaxError
     */
    toObject(): IAuthUser {
        return JSON.parse(this.toJSON());
    }

    getName(): string {
        return `${this.firstName} ${this.lastName}`
    }

    getRoles(): string[] {
        return this.roles;
    }

    protected getObject(): IAuthUser {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            roles: this.roles,
        };
    }
}
