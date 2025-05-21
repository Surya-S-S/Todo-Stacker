package com.example.apigateway.filters;

import java.util.List;
import java.util.function.Predicate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;

import com.example.apigateway.utils.JwtUtil;

@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

    @Autowired
    private JwtUtil jwtUtil;

    public AuthenticationFilter() {
        super(Config.class);
    }

    public final List<String> openApiEndpoints = List.of("/api/user/register","/api/user/login","/swagger-ui.html");

    public Predicate<ServerHttpRequest> isSecured =
            request -> openApiEndpoints
                    .stream()
                    .noneMatch(uri -> request.getURI().getPath().contains(uri));

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            if (isSecured.test(exchange.getRequest())) {
                ServerHttpRequest request = exchange.getRequest();                
                ServerHttpResponse response = exchange.getResponse();
                if (!request.getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                    response.setStatusCode(HttpStatus.UNAUTHORIZED);
                    return response.setComplete();
                }

                String token = request.getHeaders().getOrEmpty("Authorization").get(0);
                if (token!=null && token.startsWith("Bearer ")) {
                    token=token.substring(7);
                }
                jwtUtil.validateToken(token);
            }
            return chain.filter(exchange);
        });
    }

    public static class Config{}
}
