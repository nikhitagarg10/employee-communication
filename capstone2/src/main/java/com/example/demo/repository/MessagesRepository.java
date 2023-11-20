package com.example.demo.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.Messages;

@Repository
public interface MessagesRepository extends MongoRepository<Messages, String> {
	public List<Messages> findBySenderIdAndReceiverId(String senderId, String receiverId);
	
}
