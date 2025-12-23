package com.example.CBSP.ServiceImp;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.CBSP.Entity.User;
import com.example.CBSP.repositery.UserRepositery;
import com.example.CBSP.service.UserService;

@Service
public class UserImplementation implements UserService {

	private UserRepositery userRepository = null;

	@Autowired
	// create didpndancy Injection  using constructor.
	public UserImplementation(UserRepositery repo) {
		this.userRepository = repo;
	}

	// save user details
	public boolean saveUser(User user) {
		return userRepository.save(user) != null; // actual DB insert
	}

	// fatch login details and check
	public User loginUser(String email, String password) {
		
		User existingUser = userRepository.findByEmail(email);
		//System.out.println(existingUser.getEmail() + " " + existingUser.getPassword() + " existing user");
		try {
			
			if (existingUser != null && existingUser.getEmail().equals(email)
					&& existingUser.getPassword().equals(password)) {
				System.out.println("check" + "         ");
				return existingUser;
			}
		} catch (Exception e) {
			e.printStackTrace();

		}
		return null;
	}
//fatch profile
	public ArrayList<User> userProfile(String email,String password,int userid){
		ArrayList<User> profile = new ArrayList<>();
		try {
		
		User existingUser = userRepository.findByEmail(email);
		if (existingUser != null && existingUser.getEmail().equals(email)
				&& existingUser.getPassword().equals(password) 
				&& existingUser.getUserid() == userid) {
		profile.add(existingUser);
		}
		}catch(Exception e) {
			e.printStackTrace();
		}
		return profile;
	}

}// close class
