import { makeObservable, observable, action } from 'mobx'
import { Car, CarImpl } from '../types/car';
import CarService from '../services/car_service';
import { Nullable } from '../types/nullable';

export class CarStore {
  currentCar: Car = new CarImpl();
  cars: Car[] = [];
  showCarDialog: boolean = false;
  showCarRemovalDialog: boolean = false;
  carIssues: string[] = [];

  constructor() {
    makeObservable(this, {
      cars: observable,
      carIssues: observable,
      showCarDialog: observable,
      showCarRemovalDialog: observable,
      pushCarIssue: action,
      loadCars: action,
      setCars: action,
      setShowCarDialog: action,
      setShowCarRemovalDialog: action,
      clearCarIssues: action,
      clearCurrentCar: action
    });
  }

  async save(): Promise<Nullable<Car>> {
    return await CarService.save(this.currentCar);
  }

  async removeCar(): Promise<Boolean> {
    return await CarService.removeCar(this.currentCar);
  }

  async loadCars() {
    const fetchedCars = await CarService.loadCars();
    if (fetchedCars) {
      this.setCars(fetchedCars);
    }
  }

  setCars(cars : Car[]){
    this.cars = cars;
  }

  setShowCarDialog(show: boolean) {
    this.showCarDialog = show;
  }

  setShowCarRemovalDialog(show: boolean) {
    this.showCarRemovalDialog = show;
  }

  clearCarIssues() {
    this.carIssues = [];
  }

  clearCurrentCar(){
    this.currentCar = new CarImpl();
  }

  pushCarIssue(issue: string) {
    this.carIssues.push(issue);
  }

  editBrand(brand: string) {
    this.currentCar = { ...this.currentCar, brand };
  }

  editModel(model: string) {
    this.currentCar = { ...this.currentCar, model };
  }

  editRegistrationNumber(registrationNumber: string) {
    this.currentCar = { ...this.currentCar, registrationNumber };
  }

  editCapacity(capacity: number) {
    this.currentCar = { ...this.currentCar, capacity };
  }
}

export const observableCarStore = new CarStore();