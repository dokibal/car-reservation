import {Car, CarImpl} from './car';
import {User, UserImpl} from './user';

export interface Reservation{
    id: number;
    creationDate: Date;
    startDate: Date;
    endDate: Date;
    user: User;
    car: Car;
}

export class ReservationImpl implements Reservation{

    
    public id: number;
    public creationDate: Date;
    public startDate: Date;
    public endDate: Date;
    public user: User;
    public car: Car;

    constructor(){
        this.id = 0;
        this.creationDate = new Date();
        this.startDate = new Date();
        this.endDate = new Date();
        this.car = new CarImpl();
        this.user = new UserImpl();
    }
}