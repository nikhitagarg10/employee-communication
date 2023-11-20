package com.example.demo.models;

import java.util.Date;
//import java.util.List;

import org.springframework.data.annotation.Id;
//import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document(collection="messages")
public class Messages {
	
	@Id
	private String messageId;
	private String messageContent;
	private Date messageTime;
	private String senderId;
	private String receiverId;
	
	
}
