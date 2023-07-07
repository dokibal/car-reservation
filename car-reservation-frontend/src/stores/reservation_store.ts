import { makeObservable, observable, action } from 'mobx'
import { Reservation, ReservationImpl } from '../types/reservation';
import ReservationService from '../services/reservation_service';
import { Days } from '../types/days'
import { Nullable } from '../types/nullable';

export class ReservationStore {
    currentReservation : Reservation = new ReservationImpl();
    reservations: Reservation[] = [];
    viewedReservations: Map<number, Map<Days, Reservation>> = new Map();
    viewedDates: Map<Days, Date> = new Map();
    currentDay: number = 0;
    showReservationDialog : boolean = false;

    //Constants
    readonly hours = Array.from(Array(24).keys()).map(x => x);

    //Select only the numeric values of Object Days
    readonly days = Object.values(Days).filter(v=>!isNaN(Number(v)));

    constructor() {
        makeObservable(this, {
            viewedReservations: observable,
            viewedDates: observable,
            showReservationDialog: observable,
            fillReservationMap: action,
            setShowReservationDialog: action
        });
    }

    async save() : Promise<Nullable<Reservation>>{
        return await ReservationService.save(this.currentReservation);
    }

    async getReservations(startDate: Date, endDate: Date) {
        this.reservations = await ReservationService.getReservations(startDate, endDate);
    }

    async fillReservationMap() {

        //Get now date and time
        let now: Date = new Date();

        //Query reservations of the upcoming week
        let startDate: Date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        this.currentDay = startDate.getDay();
        let endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 7);

        await this.getReservations(startDate, endDate);

        this.viewedReservations.clear();
        this.viewedDates.clear();

        this.hours.map((hour, hid)=>{
            let hourEmptyReservations : Map<Days, Reservation> = new Map();
            for(let date = new Date(startDate);date<endDate;date.setDate(date.getDate()+1)){
                
                let currentDateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour);
                hourEmptyReservations.set(date.getDay() as Days, new ReservationImpl(currentDateTime));
            }
            this.viewedReservations.set(hour, hourEmptyReservations);
        });
        
        this.reservations.forEach(res=>{
            let hour : number = res.startDate.getHours();
            let hourReservations = this.viewedReservations.get(hour);
            if(hourReservations){
                hourReservations.set(res.startDate.getDay() as Days, res);
                this.viewedReservations.set(hour, hourReservations);
            }
        });
        console.log(this.viewedReservations);

        for(let date : Date = new Date(startDate); date < endDate; date.setDate(date.getDate()+1)){
            this.viewedDates.set(date.getDay() as Days, new Date(date));
        }
    }

    setShowReservationDialog(show : boolean){
        this.showReservationDialog = show;
    }
}

export const observableReservationStore = new ReservationStore();