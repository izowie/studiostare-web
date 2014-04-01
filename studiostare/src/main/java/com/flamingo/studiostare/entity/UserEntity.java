package com.flamingo.studiostare.entity;

import java.io.Serializable;
import java.util.Date;

public class UserEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	private int id;
	private String name;
	private String password;
	private String email;
	private int roleId;
	private int captureNewsFlag;
	private String twitterUser;
	private Date updateTime;
	public UserEntity(){
		id = 0;
		name = "";
		password = "";
		email = "";
		roleId = 0;
		captureNewsFlag = 0;
		twitterUser = "";
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
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public int getRoleId() {
		return roleId;
	}
	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}
	public int getCaptureNewsFlag() {
		return captureNewsFlag;
	}
	public void setCaptureNewsFlag(int captureNewsFlag) {
		this.captureNewsFlag = captureNewsFlag;
	}
	public String getTwitterUser() {
		return twitterUser;
	}
	public void setTwitterUser(String twitterUser) {
		this.twitterUser = twitterUser;
	}
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	public String getEmail() {
		return email;
	}
	

}
