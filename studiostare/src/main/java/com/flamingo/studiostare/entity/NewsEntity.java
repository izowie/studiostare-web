package com.flamingo.studiostare.entity;

import java.io.Serializable;
import java.util.Date;

public class NewsEntity implements Serializable {
	private static final long serialVersionUID = 1L; 
	private int id;
	private String title;
	private String content;
	private String photoPath;
	private String videoPath;
	private int userId;
	private Date updateTime;
	public NewsEntity(){
		id = 0;
		title = "";
		content = "";
		photoPath = "";
		videoPath = "";
		userId = 0;
		updateTime = new Date();
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getPhotoPath() {
		return photoPath;
	}
	public void setPhotoPath(String photoPath) {
		this.photoPath = photoPath;
	}
	public String getVideoPath() {
		return videoPath;
	}
	public void setVideoPath(String videoPath) {
		this.videoPath = videoPath;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
}
