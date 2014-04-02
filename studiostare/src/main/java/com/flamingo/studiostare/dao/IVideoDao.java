package com.flamingo.studiostare.dao;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.flamingo.studiostare.entity.VideoEntity;

@Repository
@Transactional
public interface IVideoDao {

	VideoEntity getVideoById(int id);
	
}