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

    constructor(startDate? : Date, car? : Car){
        this.id = 0;
        this.creationDate = new Date();
        if(startDate){
            this.startDate = startDate;
            let endDate : Date = new Date(startDate);
            endDate.setMinutes(59);
            endDate.setSeconds(59);
            endDate.setMilliseconds(999);
            this.endDate = endDate;
        }
        else{
            this.startDate = new Date();
            this.endDate = new Date();
        }
        this.car = car ?? new CarImpl();
        this.user = new UserImpl();
    }

}