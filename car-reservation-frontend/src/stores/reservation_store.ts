import { makeObservable, observable, action, computed } from 'mobx'
import { Reservation, ReservationImpl } from '../types/reservation';
import ReservationService from '../services/reservation_service';
import { Days } from '../types/days'
import { Nullable } from '../types/nullable';
import { Car } from '../types/car';

export class ReservationStore {
    currentReservation: Reservation = new ReservationImpl();
    reservations: Reservation[] = [];
    viewedReservations: Map<number, Map<Days, Reservation>> = new Map();
    viewedDates: Map<Days, Date> = new Map();
    showReservationDialog: boolean = false;
    startDate: Date = new Date();
    car: Car | undefined = undefined;

    //Constants
    readonly hours = Array.from(Array(24).keys()).map(x => x);

    //Select only the numeric values of Object Days
    readonly days = Object.values(Days).filter(v => !isNaN(Number(v)));

    constructor() {
        makeObservable(this, {
            viewedReservations: observable,
            viewedDates: observable,
            showReservationDialog: observable,
            reloadReservations: action,
            setShowReservationDialog: action,
            startDate: observable,
            formattedStartDate: computed,
            setStartDate: action,
            clearViewedReservations: action,
            addReservation: action,
            clearViewedDates: action,
            addDate: action,
            car: observable,
            setCar: action
        });

        {
            //Get now date and time
            let now: Date = new Date();

            //Query reservations of the upcoming week
            this.startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        }
    }

    clearViewedReservations() {
        this.viewedReservations.clear();
    }

    addReservation(hour: number, reservation: Map<Days, Reservation>) {
        this.viewedReservations.set(hour, reservation);
    }

    clearViewedDates() {
        this.viewedDates.clear();
    }

    addDate(day: Days, date: Date) {
        this.viewedDates.set(day, date);
    }

    setStartDate(date: Date) {
        this.startDate = date;
    }

    setCar(car: Car) {
        this.car = car;
    }

    get formattedStartDate() {
        let formattedDate = this.startDate.getFullYear().toString() + "-" + (this.startDate.getMonth() + 1).toLocaleString('hu-HU', { minimumIntegerDigits: 2 }) + "-" + this.startDate.getDate().toLocaleString('hu-HU', { minimumIntegerDigits: 2 });
        return formattedDate;
    }

    async save(): Promise<Nullable<Reservation>> {
        return await ReservationService.save(this.currentReservation);
    }

    async cancel(): Promise<boolean> {
        return await ReservationService.cancel(this.currentReservation);
    }

    async getReservations(startDate: Date, endDate: Date) {
        if (this.car && this.car.id) {
            this.reservations = await ReservationService.getReservationsByCar(startDate, endDate, this.car.id);
        }
        else {
            console.error("Car is currently undefined.");
        }
    }

    async reloadReservations() {

        let endDate = new Date(this.startDate);
        endDate.setDate(this.startDate.getDate() + 7);

        await this.getReservations(this.startDate, endDate);

        this.clearViewedReservations();
        this.clearViewedDates();

        this.hours.forEach((hour, hid) => {
            let hourEmptyReservations: Map<Days, Reservation> = new Map();
            for (let date = new Date(this.startDate); date < endDate; date.setDate(date.getDate() + 1)) {

                let currentDateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour);
                hourEmptyReservations.set(date.getDay() as Days, new ReservationImpl(currentDateTime, this.car));
            }
            this.addReservation(hour, hourEmptyReservations);
        });

        this.reservations.forEach(res => {
            let hour: number = res.startDate.getHours();

            let hourReservations = this.viewedReservations.get(hour);
            if (hourReservations) {
                hourReservations.set(res.startDate.getDay() as Days, res);
                this.addReservation(hour, hourReservations);
            }
        });

        for (let date: Date = new Date(this.startDate); date < endDate; date.setDate(date.getDate() + 1)) {
            this.addDate(date.getDay() as Days, new Date(date));
        }
    }

    setShowReservationDialog(show: boolean) {
        this.showReservationDialog = show;
    }
}

export const observableReservationStore = new ReservationStore();