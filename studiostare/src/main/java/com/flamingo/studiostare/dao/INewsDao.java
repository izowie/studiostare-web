package com.flamingo.studiostare.dao;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.flamingo.studiostare.entity.NewsEntity;

@Repository
@Transactional
public interface INewsDao {

	NewsEntity selectNewsById(int id);

	void insertNews(NewsEntity newsEntity);

	void updateNews(NewsEntity newsEntity);

	void deleteNewsById(int id);

	List<NewsEntity> selectNews(NewsEntity newsEntity);

	void deleteNews(NewsEntity newsEntity);

}
