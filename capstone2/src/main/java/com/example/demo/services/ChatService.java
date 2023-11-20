package com.example.demo.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import java.util.Date;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.Messages;
import com.example.demo.models.Notification;
import com.example.demo.repository.GroupRepository;
import com.example.demo.repository.MessagesRepository;
import com.example.demo.repository.NotificationRepository;
import com.example.demo.repository.UserRepository;
//import com.example.demo.repository.UserRepository;

@Service
public class ChatService {
	
	@Autowired
	private MessagesRepository messagesRepository;
	
	@Autowired
	private NotificationRepository notificationRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private GroupRepository groupRepository;
	
	
	//get the posted message and save it in the databse (contact chat)
	public Messages saveMessage(Messages mes)
	{
		Messages sended = this.messagesRepository.save(mes);
		
		Date date = new Date();
		String rec = mes.getReceiverId();
		String sen = mes.getSenderId();
		String name = "";
		
		
		if(this.userRepository.findById(rec).isPresent())
		{
			name = this.userRepository.findById(sen).get().getName();
			Notification noti = new Notification();
			noti.setEmpId(rec);
			noti.setNotificationTime(date);
			String content =String.format("received a message from %s", name); 
			noti.setNotificationContent(content);
			this.notificationRepository.save(noti);
		}
		else if(this.groupRepository.findById(rec).isPresent())
		{
			List<String> emps = this.groupRepository.findById(rec).get().getEmps();
			String grpName = this.groupRepository.findById(rec).get().getGroup_name();
			
			emps.forEach((e)->{
				Notification noti = new Notification();
				noti.setEmpId(rec);
				noti.setNotificationTime(date);
				String content = String.format("received a message from %s", grpName);  
				noti.setNotificationContent(content);
				this.notificationRepository.save(noti);
			});
		}
		return sended;
	}
	
	
	//get all the messages of a particular sender and receiver
	public List<Messages> getMessages(String senderId, String receiverId)
	{
		List<Messages> sTor = this.messagesRepository.findBySenderIdAndReceiverId(senderId, receiverId);
		List<Messages> rTos = this.messagesRepository.findBySenderIdAndReceiverId(receiverId, senderId);
		
		List<Messages> combined = new ArrayList<>();
		combined.addAll(sTor);
		combined.addAll(rTos);
		
		Collections.sort(combined, new Comparator<Messages>() {
			@Override
		    public int compare(Messages m1, Messages m2) {
		        return m1.getMessageTime().compareTo(m2.getMessageTime());
		    }
		});
		return combined;
	}
	
//	public void listenMessages()
//	{
//	    List<Messages> messagesList = this.messagesRepository.findAll();
//	    Stream<Messages> messagesStream = messagesList.stream();
//	    messagesStream.forEach(message -> System.out.println(message));
//	}
}
