package com.example.CBSP.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.CBSP.Entity.Book;

public interface BooksService{

		public boolean uploadFile(Book book,MultipartFile pdf,MultipartFile image) throws IOException;
		List<Book> getAllBooks();
}
