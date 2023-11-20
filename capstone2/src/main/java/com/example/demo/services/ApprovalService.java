package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.Approvals;
import com.example.demo.models.User;
import com.example.demo.repository.ApprovalRepository;
import com.example.demo.repository.UserRepository;

@Service
public class ApprovalService {
	
	@Autowired
	private ApprovalRepository approvalRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	public Approvals addNewRequest(String id, String type, String newValue)
	{
		Approvals app = new Approvals();
		app.setEmpId(id);
		app.setUpdateType(type);
		app.setNewValue(newValue);
		app.setStatus(false);
		
		return this.approvalRepository.save(app);
	}
	
	public Approvals confirmRequest(String id)
	{
		Approvals app = this.approvalRepository.findById(id).get();
		String type = app.getUpdateType();
		String newVal = app.getNewValue();
		
		User emp = this.userRepository.findById(app.getEmpId()).get();
		
		if(type.equals("name")){ 
			System.out.println("ok name");
			emp.setName(newVal); 
		}
		else if(type.equals("email")){ 
			emp.setEmail(newVal); 
		}
		else if(type.equals("phone")){ 
			double d=Double.parseDouble(newVal);  
			emp.setPhone(d);
		}
		this.userRepository.save(emp);
		
		app.setStatus(true);
		return this.approvalRepository.save(app);
	}
	
	public List<Approvals> getAll()
	{
		return this.approvalRepository.findAll();
	}
}
