export interface User{
    id: number;
    userName: string;
    password: string;
    displayName: string;
    email: string;
    phoneNumber: string;
}

export class UserImpl implements User{

    public id: number;
    public userName: string;
    public password: string;
    public displayName: string;
    public email: string;
    public phoneNumber: string;

    constructor(){
        this.id = 0;
        this.userName = "";
        this.password = "";
        this.displayName = "";
        this.email = "";
        this.phoneNumber = "";
    }
}