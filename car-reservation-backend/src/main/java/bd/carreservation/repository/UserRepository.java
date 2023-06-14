package bd.carreservation.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import bd.carreservation.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
