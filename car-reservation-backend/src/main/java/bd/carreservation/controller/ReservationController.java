package bd.carreservation.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import bd.carreservation.model.Reservation;
import bd.carreservation.service.ReservationService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class ReservationController {

	private ReservationService reservationService;

	public ReservationController(ReservationService reservationService) {
		super();
		this.reservationService = reservationService;
	}

	@GetMapping("/reservations")
	public ResponseEntity<List<Reservation>> getReservations(
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
		return ResponseEntity.ok(reservationService.getReservations(startDate, endDate));
	}

	@GetMapping("/reservations/{carId}")
	public ResponseEntity<List<Reservation>> getReservationsByCar(
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
			@PathVariable long carId) {
		return ResponseEntity.ok(reservationService.getReservationsByCar(startDate, endDate, carId));
	}

	@PostMapping("/reservation")
	public ResponseEntity<Reservation> addReservation(@RequestBody Reservation reservation) {
		return ResponseEntity.ok(reservationService.addReservation(reservation));
	}

	@DeleteMapping("/reservations/{id}")
	public ResponseEntity<Boolean> cancelReservation(@PathVariable Long id) {
		reservationService.cancelReservation(id);
		return ResponseEntity.ok(Boolean.TRUE);
	}
}
