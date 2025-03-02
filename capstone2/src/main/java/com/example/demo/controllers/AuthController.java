package com.example.demo.controllers;

//import java.lang.reflect.Array;
import java.util.*;

//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.JwtResponse;
import com.example.demo.models.User;
//import com.example.demo.repository.UserRepository;
import com.example.demo.models.JwtRequest;
import com.example.demo.security.JwtHelper;
import com.example.demo.services.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController 
{
	@Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private AuthenticationManager manager;
    @Autowired
    private JwtHelper helper;
    @Autowired
    private UserService userService;
    
//    private Logger logger = LoggerFactory.getLogger(AuthController.class);
    
    
    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request) 
    {
    	try {
    		this.doAuthenticate(request.getEmail(), request.getPassword(), request.getRole());
        	
        	UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
            String token = this.helper.generateToken(userDetails);
//            System.out.println(userDetails.get)
            JwtResponse response = JwtResponse.builder()
            	    .jwtToken(token)            	    
            	    .username(userDetails.getUsername())
                    .loginResult(userDetails.getAuthorities().toString())
            	    .build();
            
        	return new ResponseEntity<>(response, HttpStatus.OK);
    	} 
    	catch (BadCredentialsException e) {
            // return error response if authentication fails
    		JwtResponse badResponse = JwtResponse.builder()
            	    .jwtToken("no token")
            	    .username("no user")
            	    .build();
            return new ResponseEntity<>(badResponse, HttpStatus.UNAUTHORIZED);
        }
    	
    }
    
    
    private void doAuthenticate(String email, String password, String role)
    {
        List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(role));
        UsernamePasswordAuthenticationToken authentication = role.equals("admin")
                ? new UsernamePasswordAuthenticationToken(email, password, authorities)
                : new UsernamePasswordAuthenticationToken(email, password);
    	try {
    		manager.authenticate(authentication);
    	}catch(BadCredentialsException e) {
    		throw new BadCredentialsException(" Invalid Username or Password  !!");
    	}
    }
    
    @ExceptionHandler(BadCredentialsException.class)
    public String exceptionHandler() {
        return "Credentials Invalid !!";
    }
    
    @PostMapping("/createuser")
    public User creatUser(@RequestBody User user)
    {
    	return userService.createUser(user);
    }
    
    @PostMapping("/password{id}")
    public void changePassword(@PathVariable String id, @RequestBody List<String> password)
    {
    	String oldpassword = password.get(0);
    	String newpassword = password.get(1);
    	
    	userService.passwordChange(id, newpassword, oldpassword);
    	return;
    }
}
