package com.example.apigateway.utils;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class JwtUtil {
    
    private String jwtSecret="c01d06fd273c0b5a29b89cb4b30721e8";

    public void validateToken(final String token) throws JwtException {
        try {	
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
		} catch (SignatureException exp) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Invalid JWT signature",exp);
		} catch (MalformedJwtException exp) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Invalid JWT token",exp);
		} catch (ExpiredJwtException exp) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Expired JWT token",exp);
		} catch (UnsupportedJwtException exp) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Unsupported JWT token",exp);
		} catch (IllegalArgumentException exp) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"JWT claims string is empty.",exp);
		}
    }
}
