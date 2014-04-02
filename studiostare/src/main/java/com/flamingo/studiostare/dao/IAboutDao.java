package com.flamingo.studiostare.dao;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.flamingo.studiostare.entity.AboutEntity;

@Repository
@Transactional
public interface IAboutDao {

	AboutEntity getAboutById(int id);
	
}
