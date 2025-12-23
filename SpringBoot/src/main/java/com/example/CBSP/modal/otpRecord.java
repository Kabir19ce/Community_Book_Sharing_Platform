package com.example.CBSP.modal;

import java.time.Instant;

public class otpRecord {
	 private String saltBase64;
	    private String hashBase64;
	    private Instant expiresAt;

	    public otpRecord(String saltBase64, String hashBase64, Instant expiresAt) {
	        this.saltBase64 = saltBase64;
	        this.hashBase64 = hashBase64;
	        this.expiresAt = expiresAt;
	    }

	    public String getSaltBase64() { return saltBase64; }
	    public String getHashBase64() { return hashBase64; }
	    public Instant getExpiresAt() { return expiresAt; }
}
