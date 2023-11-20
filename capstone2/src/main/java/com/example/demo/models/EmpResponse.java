package com.example.demo.models;

import com.example.demo.enums.empDepartments;
import com.example.demo.enums.empRole;
import com.example.demo.enums.empStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class EmpResponse {
	private String id;
	private String name;
	private String email;
	private double phone;
	private empDepartments department;
	private empRole role;
	private empStatus status;
}
