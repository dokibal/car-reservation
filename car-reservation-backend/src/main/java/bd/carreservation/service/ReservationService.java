package bd.carreservation.service;

import java.time.LocalDateTime;
import java.util.List;

import bd.carreservation.model.Reservation;

public interface ReservationService {
	public List<Reservation> getReservations(LocalDateTime startDate, LocalDateTime endDate);

	public List<Reservation> getReservationsByCar(LocalDateTime startDate, LocalDateTime endDate, long carId);

	public Reservation addReservation(Reservation reservation);

	public void cancelReservation(Long id);
}
