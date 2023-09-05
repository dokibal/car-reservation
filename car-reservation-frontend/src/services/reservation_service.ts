import axios from 'axios';
import { RESERVATION_API_BASE_URL } from '../constants/config';
import { Reservation } from '../types/reservation';
import { Nullable } from '../types/nullable';

class ReservationService{

    async getReservationsByCar(startDate : Date, endDate : Date, carId : number){
        let url:string = RESERVATION_API_BASE_URL + "/reservations/"+carId;
        try{
            let startDateStr : string = startDate.toISOString();
            let endDateStr : string = endDate.toISOString();
            let reservations : Reservation[] = (await axios.get(url,{
                params:{
                    startDate : startDateStr,
                    endDate : endDateStr
                }
            })).data;
            return reservations;
        }
        catch(err){
            console.error(err);
            return [];
        }
    }

    async save(reservation : Reservation) : Promise<Nullable<Reservation>>{
        let url:string = RESERVATION_API_BASE_URL + "/reservation";
        try{
            return (await axios.post(url,reservation)).data;
        }
        catch(err){
            console.error(err);
            return null;
        }
    }
}
export default new ReservationService();