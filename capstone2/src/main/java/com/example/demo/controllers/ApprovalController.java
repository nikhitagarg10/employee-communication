package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Approvals;
import com.example.demo.services.ApprovalService;

@RestController
@CrossOrigin(origins = "http://localhost:4200", exposedHeaders = "**")
@RequestMapping("/admin")
public class ApprovalController {
	
	@Autowired
	private ApprovalService approvalService;
	
	@PostMapping("/confirm")
	public Approvals confirmRequest(@RequestBody String id)
	{
		return this.approvalService.confirmRequest(id);
	}
	
	@GetMapping("/get")
	public List<Approvals> getAllRequests()
	{
		return this.approvalService.getAll();
	}
}
