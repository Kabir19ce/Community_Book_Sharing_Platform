package com.example.CBSP.contoller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.CBSP.Entity.User;
import com.example.CBSP.modal.otpRecord;
import com.example.CBSP.modal.otpRequest;
import com.example.CBSP.service.OTPservice;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/otp")
public class UserOTPcontroller {

	public OTPservice otp = null;
	
	public UserOTPcontroller(OTPservice otpservice) {
		this.otp = otpservice;
	}
	
	@PostMapping("/GenrateOTP")
	public String otpGenrater(@RequestBody User user) throws Exception {
		return otp.genrateOtp(user.getUserid());
		
	}
	
	@PostMapping("/sendOTP")
	public Boolean sendOTPEmail(@RequestBody User user) throws Exception{
		//System.out.println("hello brother");
		//System.out.println(user.tempOTP + " " + user.email);
		return otp.sendOTPemail(user);
	}
	
	@PostMapping("/verifyOTP")
	public boolean checkOTP(@RequestBody otpRequest request) throws Exception {
		System.out.println(request.getUserId() + " " + request.getOtp() + " " + request.getOtp());
		return otp.varifyOTp(request);
	}
	
}
