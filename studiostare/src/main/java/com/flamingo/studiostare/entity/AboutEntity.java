package com.flamingo.studiostare.entity;

import java.io.Serializable;
import java.util.Date;

public class AboutEntity implements Serializable {
	private static final long serialVersionUID = 1L; 
	private int id;
	private String officeImgPath;
	private String aboutUsInfo;
	private String manifesto;
	private Date updateTime;
	public AboutEntity(){
		id = 0;
		officeImgPath = "";
		aboutUsInfo = "";
		manifesto = "";
		updateTime = new Date();
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getOfficeImgPath() {
		return officeImgPath;
	}
	public void setOfficeImgPath(String officeImgPath) {
		this.officeImgPath = officeImgPath;
	}
	public String getAboutUsInfo() {
		return aboutUsInfo;
	}
	public void setAboutUsInfo(String aboutUsInfo) {
		this.aboutUsInfo = aboutUsInfo;
	}
	public String getManifesto() {
		return manifesto;
	}
	public void setManifesto(String manifesto) {
		this.manifesto = manifesto;
	}
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
}
