package com.flamingo.studiostare.dao;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.flamingo.studiostare.entity.VideoEntity;

@Repository
@Transactional
public interface IVideoDao {

	VideoEntity selectVideoById(int id);

	void insertVideo(VideoEntity videoEntity);

	void updateVideo(VideoEntity videoEntity);

	void deleteVideoById(int id);

	List<VideoEntity> selectVideo(VideoEntity videoEntity);

	void deleteVideo(VideoEntity videoEntity);

}
