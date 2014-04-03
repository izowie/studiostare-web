package com.flamingo.studiostare.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.flamingo.studiostare.dao.IAboutDao;
import com.flamingo.studiostare.entity.AboutEntity;
import com.flamingo.studiostare.service.IAboutService;

@Service("aboutService")  
public class AboutServiceImpl implements IAboutService {

	@Autowired
	private IAboutDao aboutDao;
	
	@Override
	public AboutEntity getById(int id) {
		return aboutDao.selectAboutById(id);
	}

}
