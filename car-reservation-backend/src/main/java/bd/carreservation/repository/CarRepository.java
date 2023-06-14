package bd.carreservation.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import bd.carreservation.model.Car;

public interface CarRepository extends JpaRepository<Car, Long> {

}
