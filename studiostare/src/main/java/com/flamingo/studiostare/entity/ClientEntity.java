package com.flamingo.studiostare.entity;

import java.io.Serializable;
import java.util.Date;

public class ClientEntity implements Serializable {
	private static final long serialVersionUID = 1L; 
	private int id;
	private String name;
	private String phone;
	private String email;
	private String description;
	private Date updateTime;
	public ClientEntity(){
		id = 0;
		name = "";
		phone = "";
		email = "";
		description = "";
		updateTime = new Date();
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
}
