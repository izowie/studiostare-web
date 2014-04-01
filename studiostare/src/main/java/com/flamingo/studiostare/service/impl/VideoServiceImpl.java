package com.flamingo.studiostare.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.flamingo.studiostare.dao.VideoDao;
import com.flamingo.studiostare.entity.VideoEntity;
import com.flamingo.studiostare.service.IVideoService;

@Service("videoService")
public class VideoServiceImpl implements IVideoService {

	@Autowired
	private VideoDao videoDao;
	
	@Override
	public VideoEntity getById(int id) {
		return videoDao.getVideoById(id);
	}

}
