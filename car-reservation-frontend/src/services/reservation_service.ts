import axios from 'axios';
import { RESERVATION_API_BASE_URL } from '../constants/config';
import { Reservation } from '../types/reservation';
import { Nullable } from '../types/nullable';

class ReservationService {

    async getReservationsByCar(startDate: Date, endDate: Date, carId: number) {
        let url: string = RESERVATION_API_BASE_URL + "/reservations/" + carId;
        try {
            let startDateStr: string = startDate.toISOString();
            let endDateStr: string = endDate.toISOString();
            let reservations: Reservation[] = (await axios.get(url, {
                params: {
                    startDate: startDateStr,
                    endDate: endDateStr
                }
            })).data;

            //Backend provides dates as string objects.
            //Need to convert date strings to date objects. 
            return reservations.map((res) => ({
                ...res,
                startDate: new Date(res.startDate),
                endDate: new Date(res.endDate),
                creationDate: new Date(res.creationDate)
            }));
        }
        catch (err) {
            console.error(err);
            return [];
        }
    }

    toLocaleIsoString(date: Date) {
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}.${date.getMilliseconds().toString().padStart(3, '0')}`;
    }

    async save(reservation: Reservation): Promise<Nullable<Reservation>> {
        let url: string = RESERVATION_API_BASE_URL + "/reservation";
        try {
            return (await axios.post(url, {
                ...reservation,
                startDate: this.toLocaleIsoString(reservation.startDate),
                endDate: this.toLocaleIsoString(reservation.endDate),
                creationDate: this.toLocaleIsoString(reservation.creationDate),
            })).data;
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }

    async cancel(reservation: Reservation): Promise<boolean> {
        let url: string = RESERVATION_API_BASE_URL + "/reservations/"+reservation.id;
        try {
            return axios.delete(url);
        }
        catch (err) {
            console.error(err);
            return false;
        }
    }
}
const reservationService : ReservationService = new ReservationService();
export default reservationService;