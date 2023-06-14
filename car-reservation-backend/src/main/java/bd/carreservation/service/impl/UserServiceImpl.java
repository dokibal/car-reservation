package bd.carreservation.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

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
}
