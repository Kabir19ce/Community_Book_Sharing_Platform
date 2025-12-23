package com.example.CBSP.Entity;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "UserDetails")
public class User {

	@Id
	public int userid;
	public int userrole;
	public String firstname;
	public String lastname;
	public String email;
	public String phoneno;
	public String password;
	public String confirm_password;
	public int status;
	public String tempOTP;
	
	@JsonFormat(pattern = "dd-MM-yyyy") 
	public Date created_date;
	
	public int getId() {
		return userid;
	}
	public void setId(int id) {
		this.userid = id;
	}
	public int getUserid() {
		return userid;
	}
	public void setUserid(int userid) {
		this.userid = userid;
	}
	public int getUserrole() {
		return userrole;
	}
	public void setUserrole(int userrole) {
		this.userrole = userrole;
	}
	public String getFirstname() {
		return firstname;
	}
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhoneno() {
		return phoneno;
	}
	public void setPhoneno(String phoneno) {
		this.phoneno = phoneno;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getConfirm_password() {
		return confirm_password;
	}
	public void setConfirm_password(String confirm_password) {
		this.confirm_password = confirm_password;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public Date getCreated_date() {
		return created_date;
	}
	public void setCreated_date(Date created_date) {
		this.created_date = created_date;
	}
	public String getTempOTP() {
		return tempOTP;
	}
	public void setTempOTP(String tempOTP) {
		this.tempOTP = tempOTP;
	}
	
	
	
}
