package com.example.user.utils;

import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {
    
    private String jwtSecret="c01d06fd273c0b5a29b89cb4b30721e8";

    private long tokenValidity=1200000;

    public String generateToken(String userName) {
        Claims claims = Jwts.claims().setSubject(userName);
        long currMillis = System.currentTimeMillis();
        long expMillis = currMillis+tokenValidity;
        Date currDate = new Date(currMillis);
        Date expDate = new Date(expMillis);
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(currDate)
                .setExpiration(expDate)
                .signWith(SignatureAlgorithm.HS512,jwtSecret)
                .compact();
    }
}
