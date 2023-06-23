package bd.carreservation.service.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Sort;
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
	public List<Reservation> getReservations(LocalDate startDate, LocalDate endDate) {

		return reservationRepository.findAll(Sort.by(Sort.Direction.ASC, "startDate"));
	}
}
