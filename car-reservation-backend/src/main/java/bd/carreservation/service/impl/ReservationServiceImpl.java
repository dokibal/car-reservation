package bd.carreservation.service.impl;

import org.springframework.stereotype.Service;

import bd.carreservation.repository.ReservationRepository;
import bd.carreservation.service.ReservationService;

@Service
public class ReservationServiceImpl implements ReservationService {

	private ReservationRepository reservationRepository;

	public ReservationServiceImpl(ReservationRepository reservationRepository) {
		super();
		this.reservationRepository = reservationRepository;
	}
}
