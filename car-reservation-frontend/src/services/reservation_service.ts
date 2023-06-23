import axios from 'axios';
import { RESERVATION_API_BASE_URL } from '../constants/config';
import { Reservation } from '../types/reservation';

class ReservationService{
    async getReservations(startDate : Date, endDate : Date){
        let url:string = RESERVATION_API_BASE_URL + "/reservations";
        try{
            let reservations : Reservation[] = (await axios.get(url,{
                params:{
                    startDate : startDate.toISOString(),
                    endDate : endDate.toISOString()
                }
            })).data;
            return reservations;
        }
        catch(err){
            console.error(err);
            return [];
        }
    }
}
export default new ReservationService();