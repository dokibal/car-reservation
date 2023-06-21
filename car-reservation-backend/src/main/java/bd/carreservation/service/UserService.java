package bd.carreservation.service;

import java.util.List;

import bd.carreservation.model.User;

public interface UserService {
	List<User> getUsers();

	User validateUser(String userName, String password);

	boolean userExists(String email);

	User addUser(User user);
}
