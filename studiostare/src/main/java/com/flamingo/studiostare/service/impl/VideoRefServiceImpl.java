package com.flamingo.studiostare.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.flamingo.studiostare.dao.VideoRefDao;
import com.flamingo.studiostare.entity.VideoRefEntity;
import com.flamingo.studiostare.service.IVideoRefService;

@Service("videoRefService")
public class VideoRefServiceImpl implements IVideoRefService {

	@Autowired
	private VideoRefDao videoRefDao;
	
	@Override
	public VideoRefEntity getById(int id) {
		return videoRefDao.getVideoRefById(id);
	}

}
