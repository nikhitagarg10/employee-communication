package com.example.demo.services;

import java.util.ArrayList;
//import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.Group;
import com.example.demo.repository.GroupRepository;

@Service
public class GroupService 
{
	@Autowired
	private GroupRepository groupRepository;
	
	//create a new group in the databse
	public Group createNewGroup(Group newGroup)
	{
		return this.groupRepository.save(newGroup);
	}
	
	//fetch all groups from the databse
	public List<Group> getAllGroups()
	{
		return this.groupRepository.findAll();
	}
	
	//fetch a group by its id
	public Group getGroupById(String groupId){
		return this.groupRepository.findById(groupId).get();
	}
	
	//delete a group from databse
	public void deleteGroup(String groupId)
	{
		Optional<Group> opGrp = this.groupRepository.findById(groupId);
		if(opGrp.isPresent()) {
			this.groupRepository.deleteById(groupId);
			System.out.println("group deleted successfully");
		}
		else {
			System.out.println("group not found");
		}
	}
	
	//update the group name
	public void updateGroupName(String groupId, String newGroupName)
	{
	    if (groupId == null || groupId.isEmpty() || newGroupName == null || newGroupName.isEmpty()) {
	        throw new IllegalArgumentException("groupId or newGroupName cannot be null or empty");
	    }

	    Optional<Group> opGrp = this.groupRepository.findById(groupId);
	    if (opGrp.isPresent()) {
	        Group updateGrp = opGrp.get();
	        updateGrp.setGroup_name(newGroupName);
//	        System.out.println(updateGrp.getGroup_name());
	        updateGrp = this.groupRepository.save(updateGrp);
//	        System.out.println(updateGrp);
//	        System.out.println("group name is updated successfully");
	    } else {
	        System.out.println("group not found");
	    }
	    return;
	}

	//add a new employee to the group
	public void addNewEmployee(String groupId, List<String> newEmpIds)
	{
		Optional<Group> opGrp = this.groupRepository.findById(groupId);
		if (opGrp.isPresent()) {
			Group updateGrp = opGrp.get();
			
			List<String> existingEmps = new ArrayList<>(updateGrp.getEmps());
			existingEmps.addAll(newEmpIds);
			
			updateGrp.setEmps(existingEmps);
			System.out.println(updateGrp.getEmps());
			this.groupRepository.save(updateGrp);
			
			System.out.println("new employee is added to the group succesfully");
		}
		else {
			System.out.println("group not found");
		}
	}
	
	//delete a list of employees from the group
	public void deleteEmployee(String groupId, List<String> delEmpIds)
	{
		Optional<Group> opGrp = this.groupRepository.findById(groupId);
		if (opGrp.isPresent()) {
			Group updateGrp = opGrp.get();
			List<String> existingEmps = updateGrp.getEmps();
			
			delEmpIds.forEach((id)-> {
				existingEmps.remove(id);
			});
			updateGrp.setEmps(existingEmps);
			this.groupRepository.save(updateGrp);
			
			System.out.println("employees are deleted from the group succesfully");
		}
		else {
			System.out.println("group not found");
		}
	}
}
