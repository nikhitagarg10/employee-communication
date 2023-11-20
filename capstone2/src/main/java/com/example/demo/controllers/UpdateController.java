package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Approvals;
import com.example.demo.services.ApprovalService;

@RestController
@CrossOrigin(origins = "http://localhost:4200", exposedHeaders = "**")
@RequestMapping("/update")
public class UpdateController {
	
	@Autowired
	private ApprovalService approvalService;
	
	@PostMapping("/{id}/{type}")
	public Approvals requestApproval(@PathVariable("id") String id, @PathVariable("type") String type, @RequestBody String newValue)
	{
		return this.approvalService.addNewRequest(id, type, newValue);
	}
}
