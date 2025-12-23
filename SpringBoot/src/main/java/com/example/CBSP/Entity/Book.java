package com.example.CBSP.Entity;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity 
@Table(name="book_details")
public class Book {
	public int user_id;
	@Id
	public int book_id;
	public String bookname;
	public String book_category;
	public String book_author;
	@JsonFormat(pattern = "dd-MM-yyyy") 
	public Date upload_date;
	@JsonFormat(pattern = "dd-MM-yyyy") 
	public Date Approve_Reject_date;
	public int status;
	public String bookpath;
	public String bookimage;
	
	
	
	
	
	public String getBookpath() {
		return bookpath;
	}
	public void setBookpath(String bookpath) {
		this.bookpath = bookpath;
	}
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	
	
	public int getBook_id() {
		return book_id;
	}
	public void setBook_id(int book_id) {
		this.book_id = book_id;
	}
	public String getBook_category() {
		return book_category;
	}
	public void setBook_category(String book_category) {
		this.book_category = book_category;
	}
	
	public String getBookname() {
		return bookname;
	}
	public void setBookname(String bookname) {
		this.bookname = bookname;
	}
	
	public String getBook_author() {
		return book_author;
	}
	public void setBook_author(String book_author) {
		this.book_author = book_author;
	}
	public Date getUpload_date() {
		return upload_date;
	}
	public void setUpload_date(Date upload_date) {
		this.upload_date = upload_date;
	}
	public Date getApprove_Reject_date() {
		return Approve_Reject_date;
	}
	public void setApprove_Reject_date(Date approve_Reject_date) {
		Approve_Reject_date = approve_Reject_date;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getBookimage() {
		return bookimage;
	}
	public void setBookimage(String bookimage) {
		this.bookimage = bookimage;
	}
	
	

}
