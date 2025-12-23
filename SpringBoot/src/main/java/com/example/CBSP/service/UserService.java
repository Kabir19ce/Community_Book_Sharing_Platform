package com.example.CBSP.service;

import java.util.ArrayList;

import com.example.CBSP.Entity.User;

public interface UserService {

	 boolean saveUser(User user);
	 User loginUser(String email,String password);
	 ArrayList<User> userProfile(String email,String password,int userid);
	 

}
