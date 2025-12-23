package com.example.CBSP.service;

import com.example.CBSP.Entity.User;
import com.example.CBSP.modal.otpRequest;

public interface OTPservice {

	String genrateOtp(int userId) throws Exception;
	boolean sendOTPemail(User user) throws Exception;
	boolean varifyOTp(otpRequest request) throws Exception;
}
