package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Group;
import com.example.demo.services.GroupService;

@RestController
@CrossOrigin(origins = "http://localhost:4200", exposedHeaders = "**")
@RequestMapping("/group")
public class GroupController 
{
	@Autowired
	private GroupService groupService;
	
	@GetMapping("/{id}")
	public Group getGroupById(@PathVariable("id") String groupId)
	{
		System.out.println(groupId);
		return this.groupService.getGroupById(groupId);
	}
	
	
	
	@PutMapping("/updatename{id}")
	public void updateGroupName(@PathVariable("id") String id, @RequestBody String groupName)
	{
		this.groupService.updateGroupName(id, groupName);
	}
	
	@PutMapping("/addemp{id}")
	public void addGroupEmp(@PathVariable("id") String id, @RequestBody List<String> newEmps)
	{
		this.groupService.addNewEmployee(id, newEmps);
	}
	
	@PutMapping("deleteemp{id}")
	public void deleteGroupemp(@PathVariable("id") String id, @RequestBody List<String> delEmpids)
	{
		this.groupService.deleteEmployee(id, delEmpids);
	}
}
