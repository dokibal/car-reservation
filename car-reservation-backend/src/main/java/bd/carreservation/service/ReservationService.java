package bd.carreservation.service;

import java.time.LocalDate;
import java.util.List;

import bd.carreservation.model.Reservation;

public interface ReservationService {
	public List<Reservation> getReservations(LocalDate startDate, LocalDate endDate);
}
