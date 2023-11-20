package com.example.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.models.Approvals;

public interface ApprovalRepository extends MongoRepository<Approvals, String>{

}
