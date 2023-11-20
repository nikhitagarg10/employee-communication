package com.example.demo.services;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
//import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.enums.empStatus;
import com.example.demo.models.EmpResponse;
import com.example.demo.models.User;
import com.example.demo.repository.UserRepository;

@Service
public class UserService 
{
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	//get all emps from the database
	public List<EmpResponse> getUsers(){
		List<User> emps = userRepository.findAll();
		List<EmpResponse> allEmps = new ArrayList<>();
		emps.forEach((e)-> {
			EmpResponse emp = EmpResponse.builder()
								.id(e.getUserId())
								.name(e.getName())
								.email(e.getEmail())
								.phone(e.getPhone())
								.department(e.getDepartment())
								.role(e.getRole())
								.status(e.getStatus()).build();
			allEmps.add(emp);
		});
		return allEmps;
	}
	
	//add a new emp to the databse
	public User createUser(User user){
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return userRepository.save(user);
	}
	
	//fetch emp info from its id
	public User getEmpById(String empId)
	{
		return this.userRepository.findById(empId).get();
	}
	
	//fetch the current logged in user
	public User currentUser(Principal principal)
	{
		String userEmail = principal.getName();
		return this.userRepository.findByEmail(userEmail).get();
	}
	
	//pasword change
	public void passwordChange(String empId, String newPassword, String oldPassword)
	{
		User user = this.userRepository.findById(empId).get();
		String dataPassword = user.getPassword();
		String result = "";

		
		if(passwordEncoder.matches(oldPassword, dataPassword))
		{
			user.setPassword(passwordEncoder.encode(newPassword));
			this.userRepository.save(user);
			result = "password changed successfully";
		}
		else { result = "the old password is incorrect";}
		
		System.out.println(result);
		return;
	}
	

	public void changeStatus(String empId, empStatus newStatus) {
		User u1 = this.userRepository.findById(empId).get();
		u1.setStatus(newStatus);
		this.userRepository.save(u1);
		return;
		
	}
}
