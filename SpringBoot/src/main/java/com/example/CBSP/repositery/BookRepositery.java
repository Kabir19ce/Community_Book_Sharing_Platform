package com.example.CBSP.repositery;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.example.CBSP.Entity.Book;

@EnableJpaRepositories
@Repository
public interface BookRepositery extends JpaRepository<Book, String> {
	
	 //boolean findBybooknameAndbookAuthor(String bookname, String bookAuthor);

	

	
	
}
