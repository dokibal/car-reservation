
package bd.carreservation.model;

import java.time.LocalDateTime;

import bd.carreservation.constants.Constants;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity

@Table(name = Constants.RESERVATION_TABLE_NAME)
public class Reservation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(columnDefinition = "timestamp", name = "creation_date")
	private LocalDateTime creationDate;

	@Column(columnDefinition = "timestamp", name = "start_date")
	private LocalDateTime startDate;

	@Column(columnDefinition = "timestamp", name = "end_date")
	private LocalDateTime endDate;

	@ManyToOne

	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne

	@JoinColumn(name = "car_id")
	private Car car;

}
