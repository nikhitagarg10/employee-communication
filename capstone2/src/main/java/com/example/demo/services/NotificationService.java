package com.example.demo.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.Notification;
import com.example.demo.repository.NotificationRepository;

@Service
public class NotificationService {
	
	
	
	@Autowired
	private NotificationRepository notificationRepository;
	
	
	public List<Notification> getNotifications(String Id)
	{
		Optional<List<Notification>> op = this.notificationRepository.findByEmpId(Id);
		List<Notification> nlist = new ArrayList<>();
		if(op.isPresent()){
			nlist = op.get();
		}
		return nlist;
	}

}
