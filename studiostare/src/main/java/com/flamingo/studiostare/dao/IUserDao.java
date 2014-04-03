package com.flamingo.studiostare.dao;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.flamingo.studiostare.entity.UserEntity;

@Repository
@Transactional
public interface IUserDao {

	UserEntity selectUserById(int id);

	void insertUser(UserEntity userEntity);

	void updateUser(UserEntity userEntity);

	void deleteUserById(int id);

	List<UserEntity> selectUser(UserEntity userEntity);

	void deleteUser(UserEntity userEntity);

}
