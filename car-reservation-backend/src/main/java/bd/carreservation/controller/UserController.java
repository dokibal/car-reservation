package bd.carreservation.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import bd.carreservation.model.User;
import bd.carreservation.service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class UserController {

	private UserService userService;

	public UserController(UserService userService) {
		super();
		this.userService = userService;
	}

	@GetMapping("/users")
	public List<User> getUsers() {
		return userService.getUsers();
	}

	@GetMapping("/validateUser")
	public ResponseEntity<User> validateUser(@RequestParam("email") String email,
			@RequestParam("password") String password) {
		return ResponseEntity.ok(userService.validateUser(email, password));
	}

	@GetMapping("/userExists")
	public ResponseEntity<Boolean> userExists(@RequestParam("email") String email) {
		return ResponseEntity.ok(userService.userExists(email));
	}

	@PostMapping("/user")
	public ResponseEntity<User> addUser(@RequestBody User user) {
		return ResponseEntity.ok(userService.addUser(user));
	}
}
