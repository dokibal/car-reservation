package bd.carreservation.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import bd.carreservation.model.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

}
