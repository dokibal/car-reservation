package bd.carreservation.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import bd.carreservation.model.Car;
import bd.carreservation.repository.CarRepository;
import bd.carreservation.service.CarService;

@Service
public class CarServiceImpl implements CarService {
	private CarRepository carRepository;

	public CarServiceImpl(CarRepository carRepository) {
		super();
		this.carRepository = carRepository;
	}

	@Override
	public List<Car> getCars() {
		return carRepository.findAll();
	}

}
