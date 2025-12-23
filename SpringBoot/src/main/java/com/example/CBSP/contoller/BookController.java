package com.example.CBSP.contoller;

import java.io.IOException;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.CBSP.Entity.Book;
import com.example.CBSP.service.BooksService;
import com.fasterxml.jackson.databind.ObjectMapper;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/Books")
public class BookController {

	private BooksService bookservice = null;
	
	public BookController(BooksService bookservice) {
		this.bookservice = bookservice;
	}
	
	
	@PostMapping(value = "/uploadBook", consumes = {"multipart/form-data"})
	public boolean upload_Book( @RequestPart("book") String bookData,
	        @RequestPart("pdf") MultipartFile pdf, @RequestPart("image") MultipartFile image
			) throws IOException {
		 ObjectMapper mapper = new ObjectMapper();
		    Book book = mapper.readValue(bookData, Book.class);
		return bookservice.uploadFile(book, pdf,image);
	}
	
	
	//fatch All details
	@GetMapping(value="/getBooks")
	public List<Book> getAllBooks() {
	    return bookservice.getAllBooks();
	}
	
	
	
}
