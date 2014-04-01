package com.flamingo.studiostare.entity;

import java.io.Serializable;
import java.util.Date;

public class VideoEntity implements Serializable {
	private static final long serialVersionUID = 1L; 
	private int id;
	private String name;
	private String videoPath;
	private String description;
	private Date updateTime;
	public VideoEntity(){
		id = 0;
		name = "";
		videoPath = "";
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
	public String getVideoPath() {
		return videoPath;
	}
	public void setVideoPath(String videoPath) {
		this.videoPath = videoPath;
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
