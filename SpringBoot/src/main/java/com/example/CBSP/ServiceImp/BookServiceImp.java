package com.example.CBSP.ServiceImp;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.CBSP.Entity.Book;
import com.example.CBSP.repositery.BookRepositery;
import com.example.CBSP.repositery.UserRepositery;
import com.example.CBSP.service.BooksService;

@Service
public class BookServiceImp implements BooksService{

	private final String UPLOAD_DIR = "D:/uploads/";
	private final String UPLOAD_DIR_IMG = "D:/uploads/images/";
	private BookRepositery BookRepositery;
	
	
	@Autowired
	// create didpndancy Injection  using constructor.
	public BookServiceImp(BookRepositery repo) {
		this.BookRepositery = repo;
	}
	
	public boolean uploadFile(Book book,MultipartFile pdf,MultipartFile image) throws IOException {
		// TODO Auto-generated method stub
		boolean books = false;
		
	
			File folder = new File(UPLOAD_DIR);
			if(!folder.exists()) {
				folder.mkdir();
			}
			
			
			String fileName =  book.getBookname() + "_" + book.getBook_author() + ".pdf";
			Path filePath = Paths.get(UPLOAD_DIR + fileName);
			
			//upload images
			File imageFolder = new File(UPLOAD_DIR_IMG);
			if(!imageFolder.exists()) {
				imageFolder.mkdir();
			}
			
			String ImageName =  book.getBookname() + "_" + book.getBook_author() + ".jpg";
			Path imagePath = Paths.get(UPLOAD_DIR_IMG + ImageName);
			
			
			//check file exist or not
			if (Files.exists(filePath)) {
		        System.out.println("❌ File already exists: " + filePath);
		        return books;  // Do NOT upload again
		    }
			
			
			
	        Files.write(filePath, pdf.getBytes());
	        Files.write(imagePath, image.getBytes());
	        
	     
	        
	        book.setBookpath("/uploads/" + fileName);
	        book.setBookimage("/uploads/images/" + ImageName);
	        
	        
	        books = BookRepositery.save(book) != null;
	        System.out.println(books);
		
		return books;
	}
	
	
	
	public List<Book> getAllBooks() {
		// TODO Auto-generated method stub
		return BookRepositery.findAll();
	}
	

}
