package com.example.demo.controllers;

//import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Calender;
//import com.example.demo.models.Messages;
import com.example.demo.services.CalenderService;
//import com.example.demo.services.ChatService;
//import com.example.demo.services.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:4200", exposedHeaders = "**")
@RequestMapping("/calender")
public class CalenderController {
	
	@Autowired
	private CalenderService calenderService;
	
	//add event to the calender 
	@PostMapping("/add")
	public Calender addEvent(@RequestBody Calender cal)
	{
		return this.calenderService.saveEvent(cal);
	}
	
	//delete event from the calender
	@DeleteMapping("/delete{id}/{eid}")
	public void deleteEvent(@PathVariable("id") String id, @PathVariable("eid") String eid)
	{
		this.calenderService.deleteEvent(id, eid);
		return;
	}
	
	//get all events from the calender
	@GetMapping("/get{id}")
	public List<Calender> getEvent(@PathVariable("id") String id)
	{
		return this.calenderService.getEvent(id);
	}
	
	//update event
	@PutMapping("/update")
	public Calender updateEvent(@RequestBody Calender cal)
	{
		return this.calenderService.updateEvent(cal);
	}
}
