package com.example.demo.models;

import java.util.Date;
//import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.example.demo.enums.scheduleType;

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
@Document(collection="calender")
public class Calender {
	
	@Id
	private String id;
	private String empId;
	
	private String title;
	private Date start;
	private Date end;
	private scheduleType category;
	private String description;
}
