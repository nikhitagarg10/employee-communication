package com.example.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.Group;

@Repository
public interface GroupRepository extends MongoRepository<Group, String> {

}
