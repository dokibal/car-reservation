import { makeObservable, observable, action } from 'mobx'
import { Reservation, ReservationImpl } from '../types/reservation';
import ReservationService from '../services/reservation_service';
import { Days } from '../types/days'

export class ReservationStore {
    reservations: Reservation[] = [];
    viewedReservations: Map<Days, Map<number, Reservation>> = new Map();

    //Constants
    readonly firstHour: number = 0;
    readonly lastHour: number = 24;

    //Select only the numeric values of Object Days
    readonly days = Object.values(Days).filter(v=>!isNaN(Number(v)));
    readonly emptyDay: Map<number, Reservation> = new Map();

    constructor() {
        makeObservable(this, {
            reservations: observable,
            getReservations: action,
        });

        //Create empty day of reservations
        for (let i = this.firstHour; i < this.lastHour; i++) {
            this.emptyDay.set(i, new ReservationImpl());
        }
    }

    async getReservations(startDate: Date, endDate: Date) {
        this.reservations = await ReservationService.getReservations(startDate, endDate);
    }

    async fillReservationMap() {

        let now: Date = new Date();

        let startDate: Date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let endDate = startDate;
        endDate.setDate(startDate.getDate() + 7);

        // await this.getReservations(startDate, endDate);

        let currentDay: number = startDate.getDay();

        //Create separate maps first for the days next week and this week
        //Then merge the two maps and order them
        let reservationsNextWeek: Map<Days, Map<number, Reservation>> = new Map();
        let reservationsThisWeek: Map<Days, Map<number, Reservation>> = new Map();

        this.viewedReservations.clear();
        this.days.forEach((day, index) => {
            if (index < currentDay) {
                reservationsNextWeek.set(day as Days, this.emptyDay)
            }
            else{
                reservationsThisWeek.set(day as Days, this.emptyDay)
            }
        });

        this.viewedReservations = new Map([...Array.from(reservationsNextWeek.entries()),...Array.from(reservationsThisWeek.entries())])
        console.log(this.emptyDay);
        this.reservations.forEach(res=>{
            let day : Days = res.startDate.getDay() as Days;
            let daysReservations = this.viewedReservations.get(day) ?? this.emptyDay;
            daysReservations.set(res.startDate.getHours(), res);
            this.viewedReservations.set(day, daysReservations);
        });
    }
}

export const observableReservationStore = new ReservationStore();