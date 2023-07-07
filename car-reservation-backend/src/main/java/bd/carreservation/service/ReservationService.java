package bd.carreservation.service;

import java.time.LocalDateTime;
import java.util.List;

import bd.carreservation.model.Reservation;

public interface ReservationService {
	public List<Reservation> getReservations(LocalDateTime startDate, LocalDateTime endDate);

	public Reservation addReservation(Reservation reservation);
}
