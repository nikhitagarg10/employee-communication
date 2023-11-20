package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.models.Notification;


public interface NotificationRepository extends MongoRepository<Notification, String> {
	
	public Optional<List<Notification>> findByEmpId(String id);
}
