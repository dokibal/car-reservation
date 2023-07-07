import axios from 'axios';
import { RESERVATION_API_BASE_URL } from '../constants/config';
import { Car } from '../types/car';
import { Nullable } from '../types/nullable';

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

    async save(car : Car) : Promise<Nullable<Car>>{
        let url:string = RESERVATION_API_BASE_URL + "/car";
        try{
            if(car.id){
                return (await axios.put(url+`/${car.id}`, car)).data;
            }
            else{
                return (await axios.post(url, car)).data;
            }
        }
        catch(err){
            console.error(err);
            return null;
        }
    }
}
export default new CarService();