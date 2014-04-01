package com.flamingo.studiostare.dao;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.flamingo.studiostare.entity.UserEntity;

@Repository
@Transactional
public interface UserDao {

	UserEntity getUserById(int id);
	
}
