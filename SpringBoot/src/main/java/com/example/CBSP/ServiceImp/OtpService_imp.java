package com.example.CBSP.ServiceImp;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.Base64;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

import javax.sound.sampled.Clip;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.CBSP.CommunityBookSharingPlatfomeApplication;
import com.example.CBSP.Entity.User;
import com.example.CBSP.mail.EmailService;
import com.example.CBSP.modal.otpRecord;
import com.example.CBSP.modal.otpRequest;
import com.example.CBSP.repositery.UserRepositery;
import com.example.CBSP.service.OTPservice;

@Service
public class OtpService_imp implements OTPservice {

	private static final SecureRandom random = new SecureRandom();
	private static final int OTP_LENGTH = 6;
	private static final int MAX = (int) Math.pow(10, OTP_LENGTH);
	
	private static EmailService emailservices;
	private final Map<Integer, otpRecord> otpStore = new ConcurrentHashMap<>();
	private User user;
	
	public OtpService_imp(EmailService emailService) {  // <---- FIXED Constructor Injection
        this.emailservices = emailService;
    }

	public String genrateOtp(int userId) throws Exception {
	    // Generate a fresh 6-digit OTP
	    int otpNum = random.nextInt(MAX);
	    String otp = String.format("%0" + OTP_LENGTH + "d", otpNum);

	    // Create salt and hash (optional, for security)
	    byte[] salt = new byte[16];
	    random.nextBytes(salt);
	    byte[] hash = sha256(concat(salt, otp.getBytes(StandardCharsets.UTF_8)));

	    String saltB64 = Base64.getEncoder().encodeToString(salt);
	    String hashB64 = Base64.getEncoder().encodeToString(hash);

	    // Set OTP expiration to 2 minutes from now
	    Instant expiresAt = Instant.now().plusSeconds(120);

	    // Store the new OTP record, overwriting any previous one
	    otpStore.put(userId, new otpRecord(saltB64, hashB64, expiresAt));

	    System.out.println("Generated new OTP for user " + userId + ": " + otp + " (expires at " + expiresAt + ")");

	    return otp;
	}

	private static byte[] concat(byte[] a, byte[] b) {
		byte[] c = new byte[a.length + b.length];
		System.arraycopy(a, 0, c, 0, a.length);
		System.arraycopy(b, 0, c, a.length, b.length);
		return c;
	}

	private static byte[] sha256(byte[] input) throws Exception {
		MessageDigest md = MessageDigest.getInstance("SHA-256");
		return md.digest(input);
	}
	
	//sendOTPWay Email
	
	
	
	
	
	//Verify OTP
	
	public boolean varifyOTp(otpRequest request) {
		if(request.getUserId() != 0
				&& request.getUserOTP() != null || !request.getUserOTP().equals("")
				&& request.getOtp() != null || !request.getOtp().equals("")) {
			//check OTp 
			if(request.getUserOTP().equals(request.getOtp())) {
				return true;
			}
		}
		return false;
	}

	
	public boolean sendOTPemail(User user) throws Exception {
		// TODO Auto-generated method stub
		//System.out.println("service implementation"+ " "+user.getTempOTP() + " " +user.getEmail());
		return emailservices.sendOtpEmail(user.getTempOTP(), user.getEmail());
		
	}



}
