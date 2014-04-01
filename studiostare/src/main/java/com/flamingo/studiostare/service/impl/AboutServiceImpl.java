package com.flamingo.studiostare.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.flamingo.studiostare.dao.AboutDao;
import com.flamingo.studiostare.entity.AboutEntity;
import com.flamingo.studiostare.service.IAboutService;

@Service("aboutService")  
public class AboutServiceImpl implements IAboutService {

	@Autowired
	private AboutDao aboutDao;
	
	@Override
	public AboutEntity getById(int id) {
		return aboutDao.getAboutById(id);
	}

}
