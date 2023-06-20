import axios from 'axios';
import { RESERVATION_API_BASE_URL } from '../constants/config';
import { Car } from '../types/car';

class CarService{
    async getCars(){
        let url:string = RESERVATION_API_BASE_URL + "/cars";
        try{
            let cars:Car[] = (await axios.get(url)).data;
            return cars;
        }
        catch(err){
            console.error(err);
        }
    }
}
export default new CarService();