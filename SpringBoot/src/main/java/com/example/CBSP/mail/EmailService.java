package com.example.CBSP.mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;
    private final EmailBody body;
    @Autowired
    public EmailService(JavaMailSender mailSender, EmailBody body) {
        this.mailSender = mailSender;
        this.body = body;   // FIXED
    }
    
   
    


    public boolean sendOtpEmail(String otp,String to) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            //message.setTo(to);
            message.setTo("faizalkabirmansuri@gmail.com");
            message.setSubject(body.EmailTitel());
            message.setText(body.EmailBody(otp));
            message.setFrom("faizalkabirmansuri@gmail.com"); // same as spring.mail.username

            mailSender.send(message); // send email
            return true;              // success
        } catch (Exception e) {
            e.printStackTrace();
            return false;             // failed to send
        }
    }
}
