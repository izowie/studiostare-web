package com.flamingo.studiostare.dao;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.flamingo.studiostare.entity.CategoryEntity;

@Repository
@Transactional
public interface ICategoryDao {

	CategoryEntity selectCategoryById(int id);

	void insertCategory(CategoryEntity categoryEntity);

	void updateCategory(CategoryEntity categoryEntity);

	void deleteCategoryById(int id);

	List<CategoryEntity> selectCategory(CategoryEntity categoryEntity);

	void deleteCategory(CategoryEntity categoryEntity);

}
