package bd.carreservation.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

	@PostMapping("/car")
	public ResponseEntity<Car> addCar(@RequestBody Car car) {
		System.out.println(car);
		return ResponseEntity.ok(carService.addCar(car));
	}

	@PutMapping("/car/{id}")
	public ResponseEntity<Car> updateCar(@PathVariable Long id, @RequestBody Car car) {
		System.out.println(car);
		return ResponseEntity.ok(carService.updateCar(id, car));
	}
}
