package com.flamingo.studiostare.dao;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.flamingo.studiostare.entity.VideoRefEntity;

@Repository
@Transactional
public interface IVideoRefDao {

	VideoRefEntity selectVideoRefById(int id);

	void insertVideoRef(VideoRefEntity videoRefEntity);

	void updateVideoRef(VideoRefEntity videoRefEntity);

	void deleteVideoRefById(int id);

	List<VideoRefEntity> selectVideoRef(VideoRefEntity videoRefEntity);

	void deleteVideoRef(VideoRefEntity videoRefEntity);
	
}
