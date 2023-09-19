export interface User{
    id: number;
    email: string;
    password: string;
    displayName: string;
    phoneNumber: string;
}

export class UserImpl implements User{

    public id: number;
    public email: string;
    public password: string;
    public displayName: string;
    public phoneNumber: string;

    constructor(){
        this.id = 0;
        this.email = "";
        this.password = "";
        this.displayName = "";
        this.phoneNumber = "";
    }
}