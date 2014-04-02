package com.flamingo.studiostare.dao;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.flamingo.studiostare.entity.VideoRefEntity;

@Repository
@Transactional
public interface IVideoRefDao {

	VideoRefEntity getVideoRefById(int id);
	
}
