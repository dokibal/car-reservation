package bd.carreservation.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import bd.carreservation.exception.ResourceNotFoundException;
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

	@Override
	public List<Reservation> getReservationsByCar(LocalDateTime startDate, LocalDateTime endDate, long carId) {
		return reservationRepository.findReservationByDateByCar(startDate, endDate, carId);
	}

	@Override
	public void cancelReservation(Long id) {
		Reservation reservation = reservationRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Reservation does not exist with id:" + id));
		reservationRepository.deleteById(reservation.getId());
	}
}
