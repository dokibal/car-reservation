package bd.carreservation.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import bd.carreservation.model.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

	@Query("SELECT r FROM Reservation r WHERE (r.startDate >= :startDate AND r.endDate <= :endDate) ORDER BY startDate DESC")
	List<Reservation> findReservationByDate(@Param("startDate") LocalDateTime startDate,
			@Param("endDate") LocalDateTime endDate);

	@Query("SELECT r FROM Reservation r WHERE (r.startDate >= :startDate AND r.endDate <= :endDate AND r.car.Id = :carId) ORDER BY startDate DESC")
	List<Reservation> findReservationByDateByCar(@Param("startDate") LocalDateTime startDate,
			@Param("endDate") LocalDateTime endDate, @Param("carId") long carId);
}
