package com.flamingo.studiostare.dao;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.flamingo.studiostare.entity.CategoryEntity;

@Repository
@Transactional
public interface ICategoryDao {

	CategoryEntity getCategoryById(int id);
	
}
