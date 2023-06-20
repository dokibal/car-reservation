import {makeObservable, observable, action } from 'mobx'
import { Car } from '../types/car';
import CarService from '../services/car_service';

export class CarStore {
    cars : Car[] | null= null;
  
    constructor() {
      makeObservable(this, {
        cars: observable,
        getCars: action,
      });
    }
  
    async getCars(){
        const fetchedCars = await CarService.getCars();
        if(fetchedCars){
            console.log(fetchedCars);
            this.cars = fetchedCars;
        }
    }
}
  
export const observableCarStore = new CarStore();