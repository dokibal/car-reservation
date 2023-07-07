package bd.carreservation.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import bd.carreservation.model.Reservation;
import bd.carreservation.repository.ReservationRepository;
import bd.carreservation.service.ReservationService;

@Service
public class ReservationServiceImpl implements ReservationService {

	private ReservationRepository reservationRepository;

	public ReservationServiceImpl(ReservationRepository reservationRepository) {
		super();
		this.reservationRepository = reservationRepository;
	}

	@Override
	public List<Reservation> getReservations(LocalDateTime startDate, LocalDateTime endDate) {

		return reservationRepository.findReservationByDate(startDate, endDate);
	}

	@Override
	public Reservation addReservation(Reservation reservation) {

		return reservationRepository.save(reservation);
	}
}
