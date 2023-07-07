package bd.carreservation.service;

import java.util.List;

import bd.carreservation.model.Car;

public interface CarService {
	List<Car> getCars();

	public Car addCar(Car car);

	public Car updateCar(Long id, Car car);
}