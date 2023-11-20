package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.Calender;
//import com.example.demo.models.User;

@Repository
public interface CalenderRepository extends MongoRepository<Calender, String> {
	
	public Optional<List<Calender>> findByEmpId(String empId);
	public Optional<Calender> findByEmpIdAndId(String empId, String Id);
	public Optional<Calender> findByStart(String startDate);
	public Optional<Calender> findByEnd(String startDate);
}
