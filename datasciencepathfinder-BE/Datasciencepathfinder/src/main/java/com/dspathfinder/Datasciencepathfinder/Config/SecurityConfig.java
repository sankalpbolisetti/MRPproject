package com.dspathfinder.Datasciencepathfinder.Config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private FirebaseTokenFilter firebaseTokenFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors(cors -> cors.configure(http)) // Disable CORS configuration for the moment
                .csrf(csrf -> csrf.disable()) // Disable CSRF for JWT
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.POST, "/users/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/skills/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/skills").permitAll()
                        .requestMatchers(HttpMethod.POST, "/progress/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/applications").permitAll()
                        .requestMatchers(HttpMethod.POST, "/applications/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/profeciency").permitAll()// Allow public access
                        .anyRequest().authenticated()) // Require authentication for all other requests
                .formLogin(AbstractHttpConfigurer::disable) // Enable form login (important)
                .httpBasic(AbstractHttpConfigurer::disable); // Disable HTTP basic authentication
        http.addFilterBefore(firebaseTokenFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
