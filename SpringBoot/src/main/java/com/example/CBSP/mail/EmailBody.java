package com.example.CBSP.mail;

import org.springframework.stereotype.Component;

import com.example.CBSP.Entity.User;

@Component
public class EmailBody {
	
	
public String EmailTitel () {
	String Titel = "Happy to Join US Your One Time Password here";
	return Titel;
}

public String EmailBody(String otp) {
	String body =
	        "Hello,\n\n" +
	        "Welcome to Community Book Sharing Platform!\n\n" +
	        "Your One-Time Password (OTP) for verification is:\n\n" +
	        "🔐 OTP: " + otp + "\n\n" +
	        "This OTP is valid for 5 minutes. Please do not share it with anyone.\n\n" +
	        "Thank you,\n" +
	        "Community Book Sharing Platform Team";
return body;
}
	

}
