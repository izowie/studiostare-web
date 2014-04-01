package com.flamingo.studiostare.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.flamingo.studiostare.dao.CategoryDao;
import com.flamingo.studiostare.entity.CategoryEntity;
import com.flamingo.studiostare.service.ICategoryService;

@Service("categoryService")
public class CategoryServiceImpl implements ICategoryService {

	@Autowired
	private CategoryDao categoryDao;
	
	@Override
	public CategoryEntity getById(int id) {
		return categoryDao.getCategoryById(id);
	}

}
