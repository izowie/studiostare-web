package com.flamingo.studiostare.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.flamingo.studiostare.dao.INewsDao;
import com.flamingo.studiostare.entity.NewsEntity;
import com.flamingo.studiostare.service.INewsService;

@Service("newsService")
public class NewsServiceImpl implements INewsService {

	@Autowired
	private INewsDao newsDao;
	
	@Override
	public NewsEntity getById(int id) {
		return newsDao.getNewsById(id);
	}

}
