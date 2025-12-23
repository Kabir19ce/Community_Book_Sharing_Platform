package com.example.CBSP.repositery;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.CBSP.Entity.User;
import java.util.List;

@Repository
public interface UserRepositery extends JpaRepository<User, Integer>{

	User findByEmail(String email);

	
	
}
