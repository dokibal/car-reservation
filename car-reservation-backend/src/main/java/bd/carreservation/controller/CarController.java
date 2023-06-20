package bd.carreservation.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bd.carreservation.model.Car;
import bd.carreservation.service.CarService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class CarController {

	private CarService carService;

	public CarController(CarService carService) {
		super();
		this.carService = carService;
	}

	@GetMapping("/cars")
	public ResponseEntity<List<Car>> getCars() {
		return ResponseEntity.ok(carService.getCars());
	}
}
