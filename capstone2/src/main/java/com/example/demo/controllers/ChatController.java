package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Messages;
import com.example.demo.services.ChatService;
//import com.example.demo.services.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:4200", exposedHeaders = "**")
@RequestMapping("/chat")
public class ChatController 
{
//	@Autowired
//	private UserService userService;
	@Autowired
	private ChatService chatService;
	
	//store the posted message in the database
	@PostMapping("/sendmessage")
	public Messages sendMessage(@RequestBody Messages mes)
	{
		Messages out = this.chatService.saveMessage(mes);
//		this.chatService.listenMessages();
		return out;
	}
	
	//
	@GetMapping("/getmessages{sid}/{rid}")
	public List<Messages> getMessages(@PathVariable("sid") String senderId, @PathVariable("rid") String receiverId)
	{
		System.out.println(senderId);
		System.out.println(receiverId);
		return this.chatService.getMessages(senderId, receiverId);
	}
}
