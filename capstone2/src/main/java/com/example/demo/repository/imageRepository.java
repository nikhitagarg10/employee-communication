package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.models.User;
import com.example.demo.models.imageUpload;

public interface imageRepository extends MongoRepository<imageUpload, String> {
	public Optional<imageUpload> findByEmp(User emp);
}
