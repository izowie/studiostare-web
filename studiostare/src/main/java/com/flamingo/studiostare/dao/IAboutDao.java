package com.flamingo.studiostare.dao;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.flamingo.studiostare.entity.AboutEntity;

@Repository
@Transactional
public interface IAboutDao {

	AboutEntity selectAboutById(int id);
	
	void insertAbout(AboutEntity aboutEntity);
	
	void updateAbout(AboutEntity aboutEntity);
	
	void deleteAboutById(int id);

	List<AboutEntity> selectAbout(AboutEntity aboutEntity);

	void deleteAbout(AboutEntity aboutEntity);
	
}
