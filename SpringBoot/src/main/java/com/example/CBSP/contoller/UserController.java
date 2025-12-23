package com.example.CBSP.contoller;

import java.util.ArrayList;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.CBSP.Entity.User;
import com.example.CBSP.service.UserService;

import jakarta.servlet.http.HttpSession;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/users")
public class UserController {
	
	private UserService service = null;

	public UserController(UserService service) {
		this.service = service;
	}
	
	@PostMapping("/Registration")
	public boolean saveUserDetails(@RequestBody User user) {
		return service.saveUser(user);
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody User user, HttpSession session) {
		
	    User loggedInUser = service.loginUser(user.getEmail(), user.getPassword());
	    if (loggedInUser != null) {
	        session.setAttribute("user", loggedInUser);
	        return ResponseEntity.ok(loggedInUser);
	    } else {
	        return ResponseEntity.status(HttpStatus.SC_UNAUTHORIZED).body("Invalid credentials");
	    }
	}
	
	@PostMapping("/Profile")
	public ArrayList<User> profileUser(@RequestBody User user) {
		return service.userProfile(user.getEmail(),user.getPassword(),user.getId());
	}

	//updateProfile
	

}//close
