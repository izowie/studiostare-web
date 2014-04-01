package com.flamingo.studiostare.entity;

import java.io.Serializable;
import java.util.Date;

public class VideoRefEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	private int id;
	private int videoId;
	private int clientId;
	private int categoryId;
	private String description;
	private Date updateTime;
	public VideoRefEntity(){
		id = 0;
		videoId = 0;
		clientId = 0;
		categoryId = 0;
		description = "";
		updateTime = new Date();
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getVideoId() {
		return videoId;
	}
	public void setVideoId(int videoId) {
		this.videoId = videoId;
	}
	public int getClientId() {
		return clientId;
	}
	public void setClientId(int clientId) {
		this.clientId = clientId;
	}
	public int getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
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
