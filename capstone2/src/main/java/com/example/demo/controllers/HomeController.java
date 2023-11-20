package com.example.demo.controllers;

import java.io.IOException;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.enums.empStatus;
import com.example.demo.models.EmpResponse;
import com.example.demo.models.Group;
import com.example.demo.models.User;
import com.example.demo.models.imageUpload;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.imageRepository;
import com.example.demo.services.GroupService;
import com.example.demo.services.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:4200", exposedHeaders = "**")
@RequestMapping("/home")
public class HomeController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private GroupService groupService;
	
	@Autowired
    private imageRepository imageRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@GetMapping("/users")
	public List<EmpResponse> getUser(@RequestHeader("Authorization") String authorizationHeader)
	{
		return userService.getUsers();
	}
	
	@GetMapping("/userbyid{id}")
	public User getEmpById(@PathVariable("id") String empId)
	{
		return this.userService.getEmpById(empId);
	}
	
	//create a new group request
	@PostMapping("/newgroup")
	public Group createNewGroupp(@RequestBody Group newGroup)
	{
		System.out.println(newGroup);
		return this.groupService.createNewGroup(newGroup);
		
	}
	
	//get all groups present request
	@GetMapping("/allgroups")
	public List<Group> getUser()
	{
		return this.groupService.getAllGroups();
	}
	
	//delete a group request
	@DeleteMapping("/delete{id}")
	public void deleteGroup(@PathVariable("id") String groupId)
	{
		this.groupService.deleteGroup(groupId);
	}
	
	@GetMapping("/currentuser")
	public User getLoggedInUser(Principal principal)
	{
		return this.userService.currentUser(principal);
	}
	
	@PostMapping("/statuschange{id}")
	public void statusChange(@PathVariable("id") String empId, @RequestBody empStatus newStatus)
	{
		this.userService.changeStatus(empId, newStatus);
		return;
	}
	
	
	@PostMapping("/addimage{id}")
	public String addPhoto(@PathVariable("id") String empId, @RequestParam("image") MultipartFile file) throws IOException {
		
		User user1 = this.userRepo.findById(empId).get();
		Optional<imageUpload> opImg = this.imageRepo.findByEmp(user1);
		if(opImg.isPresent()) {
			imageUpload i = opImg.get();
			i.setImage(new Binary(BsonBinarySubType.BINARY, file.getBytes()));
			this.imageRepo.save(i); 
			return i.getImageId();
		}
		else {
			imageUpload photo = new imageUpload();
	        photo.setImage(new Binary(BsonBinarySubType.BINARY, file.getBytes()));
	        photo.setEmp(this.userService.getEmpById(empId));
	        photo = imageRepo.insert(photo); 
	        return photo.getImageId(); 
		}
    }
	
	@GetMapping("/getimage{id}")
    public imageUpload getPhoto(@PathVariable("id") String id) { 
        Optional<imageUpload> op = this.imageRepo.findByEmp(this.userService.getEmpById(id));
        if(op.isPresent())
        {
        	return op.get();
        }
        return null;
    }
}
