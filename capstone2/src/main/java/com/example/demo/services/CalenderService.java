package com.example.demo.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.Calender;
//import com.example.demo.models.Group;
import com.example.demo.repository.CalenderRepository;
//import com.example.demo.repository.MessagesRepository;

@Service
public class CalenderService {
	
	@Autowired
	private CalenderRepository calenderRepository;
	
	//save a particular event of an employee in database
	public Calender saveEvent(Calender cal)
	{
		return this.calenderRepository.save(cal);
	}
	
	public void deleteEvent(String id, String eid)
	{
		Optional<Calender> cal = this.calenderRepository.findByEmpIdAndId(eid, id);
		if(cal.isPresent()) {
			this.calenderRepository.deleteById(id);
			System.out.println("group deleted successfully");
		}
		else {
			System.out.println("group not found");
		}
	}
	
	//get all the calender events of a particular employee
	public List<Calender> getEvent(String id)
	{
		Optional<List<Calender>> cal = this.calenderRepository.findByEmpId(id);
		List<Calender> lcal = new ArrayList<>();
		if(cal.isPresent())
		{
			lcal = cal.get();
		}
		return lcal;
	}
	
	public Calender updateEvent(Calender cal)
	{
		return this.calenderRepository.save(cal);
	}
}
