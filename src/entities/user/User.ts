import { EStatus, IAvatar, IUser } from "@entities/user";

export class User {
    private readonly id: string;
    private readonly firstName: string;
    private readonly lastName: string;
    private readonly email: string;
    private readonly status?: EStatus;
    private readonly photo?: IAvatar;
    private readonly password?: string;
    private readonly confirmPassword?: string;

    constructor(params: IUser) {
        this.id = params.id;
        this.firstName = params.firstName;
        this.lastName = params.lastName;
        this.email = params.email;
        this.status = params.status;
        this.photo = params.photo;
        this.password = params.password;
        this.confirmPassword = params.confirmPassword;
    }

    /**
     * @throws TypeError
     */
    toJSON(): string {
        return JSON.stringify(this.getUserObject());
    }

    /**
     * @throws SyntaxError
     */
    toObject(): IUser {
        return JSON.parse(JSON.stringify(this.getUserObject()));
    }

    private getUserObject(): IUser {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            status: this.status,
            photo: this.photo,
            password: this.password,
            confirmPassword: this.confirmPassword
        };
    }
}
