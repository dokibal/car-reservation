package bd.carreservation.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import bd.carreservation.exception.UnexpectedRecordsFoundException;
import bd.carreservation.model.User;
import bd.carreservation.repository.UserRepository;
import bd.carreservation.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	private UserRepository userRepository;

	public UserServiceImpl(UserRepository userRepository) {
		super();
		this.userRepository = userRepository;
	}

	@Override
	public List<User> getUsers() {
		return userRepository.findAll();
	}

	@Override
	public User validateUser(String email, String password) {
		List<User> users = userRepository.getUserByEmail(email);

		User validUser;

		// Handle different number of users
		switch (users.size()) {
		case 0:
			// No user with the given email, return with empty user
			return new User();
		case 1:
			validUser = users.get(0);
			break;
		default:
			throw new UnexpectedRecordsFoundException("Multiple user found the given email.");
		}

		// If only 1 user found: validate the password
		if (password.equals(validUser.getPassword())) {
			return validUser;
		} else {
			// Password does not match, return with empty user
			return new User();
		}
	}

	@Override
	public boolean userExists(String email) {
		// TODO Auto-generated method stub
		List<User> users = userRepository.getUserByEmail(email);

		// Handle different number of users
		switch (users.size()) {
		case 0:
			// No user with the given email
			return false;
		case 1:
			return true;
		default:
			throw new UnexpectedRecordsFoundException("Multiple user found the given email.");
		}
	}

	@Override
	public User addUser(User user) {
		return userRepository.save(user);
	}
}
