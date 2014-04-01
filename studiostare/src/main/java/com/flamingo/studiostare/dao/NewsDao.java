package com.flamingo.studiostare.dao;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.flamingo.studiostare.entity.NewsEntity;

@Repository
@Transactional
public interface NewsDao {

	NewsEntity getNewsById(int id);
	
}
