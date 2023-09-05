import { makeObservable, observable, action, computed } from 'mobx'
import { Reservation, ReservationImpl } from '../types/reservation';
import ReservationService from '../services/reservation_service';
import { Days } from '../types/days'
import { Nullable } from '../types/nullable';

export class ReservationStore {
    currentReservation : Reservation = new ReservationImpl();
    reservations: Reservation[] = [];
    viewedReservations: Map<number, Map<Days, Reservation>> = new Map();
    viewedDates: Map<Days, Date> = new Map();
    showReservationDialog : boolean = false;
    startDate: Date = new Date();
    carId : number = 0;

    //Constants
    readonly hours = Array.from(Array(24).keys()).map(x => x);

    //Select only the numeric values of Object Days
    readonly days = Object.values(Days).filter(v=>!isNaN(Number(v)));

    constructor() {
        makeObservable(this, {
            viewedReservations: observable,
            viewedDates: observable,
            showReservationDialog: observable,
            initReservations: action,
            fillReservationMap: action,
            setShowReservationDialog: action,
            startDate: observable,
            formattedStartDate: computed,
            setStartDate: action,
            clearViewedReservations: action,
            addReservation: action,
            clearViewedDates: action,
            addDate: action,
            carId: observable,
            setCarId: action
        });
    }

    clearViewedReservations(){
        this.viewedReservations.clear();
    }

    addReservation(hour : number, reservation : Map<Days, Reservation>){
        this.viewedReservations.set(hour, reservation);
    }

    clearViewedDates(){
        this.viewedDates.clear();
    }

    addDate(day : Days, date : Date){
        this.viewedDates.set(day, date);
    }

    setStartDate(date : Date){
        this.startDate = date;
    }

    setCarId(carId : number){
        this.carId = carId;
    }

    get formattedStartDate(){
        let formattedDate = this.startDate.getFullYear().toString()+"-"+(this.startDate.getMonth()+1).toLocaleString('hu-HU',{minimumIntegerDigits:2})+"-"+this.startDate.getDate().toLocaleString('hu-HU',{minimumIntegerDigits:2});
        return formattedDate;
    }

    async save() : Promise<Nullable<Reservation>>{
        return await ReservationService.save(this.currentReservation);
    }

    async getReservations(startDate: Date, endDate: Date) {
        this.reservations = await ReservationService.getReservationsByCar(startDate, endDate, this.carId);
    }

    async initReservations() {
        //Get now date and time
        let now: Date = new Date();

        //Query reservations of the upcoming week
        this.startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        await this.fillReservationMap();
    }

    async fillReservationMap() {

        let endDate = new Date(this.startDate);
        endDate.setDate(this.startDate.getDate() + 7);
        console.log(endDate);

        await this.getReservations(this.startDate, endDate);

        this.clearViewedReservations();
        this.clearViewedDates();

        this.hours.forEach((hour, hid)=>{
            let hourEmptyReservations : Map<Days, Reservation> = new Map();
            for(let date = new Date(this.startDate);date<endDate;date.setDate(date.getDate()+1)){
                
                let currentDateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour);
                hourEmptyReservations.set(date.getDay() as Days, new ReservationImpl(currentDateTime));
            }
            this.addReservation(hour, hourEmptyReservations);
        });
        
        this.reservations.forEach(res=>{
            let hour : number = res.startDate.getHours();
            let hourReservations = this.viewedReservations.get(hour);
            if(hourReservations){
                hourReservations.set(res.startDate.getDay() as Days, res);
                this.addReservation(hour, hourReservations);
            }
        });

        for(let date : Date = new Date(this.startDate); date < endDate; date.setDate(date.getDate()+1)){
            this.addDate(date.getDay() as Days, new Date(date));
        }
    }

    setShowReservationDialog(show : boolean){
        this.showReservationDialog = show;
    }
}

export const observableReservationStore = new ReservationStore();