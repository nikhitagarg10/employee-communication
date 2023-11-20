package com.example.demo.controllers;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//import com.example.demo.models.Messages;
import com.example.demo.models.Notification;
import com.example.demo.services.NotificationService;



@RestController
@CrossOrigin(origins = "http://localhost:4200", exposedHeaders = "**")
@RequestMapping("/notification")
public class NotificationController {
	
	@Autowired
	private NotificationService notificationService;
	
	@GetMapping("/getnot{id}")
	public List<Notification> getMessages(@PathVariable("id") String Id)
	{
		return this.notificationService.getNotifications(Id);
	}
	

}
