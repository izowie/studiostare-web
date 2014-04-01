package com.flamingo.studiostare.service;

import com.flamingo.studiostare.entity.UserEntity;

public interface IUserService {
	
	boolean checkLogin(UserEntity userEntity);
	
	UserEntity getById(int id);
	
}
