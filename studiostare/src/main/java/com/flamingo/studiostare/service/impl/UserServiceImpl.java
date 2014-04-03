package com.flamingo.studiostare.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.flamingo.studiostare.dao.IUserDao;
import com.flamingo.studiostare.entity.UserEntity;
import com.flamingo.studiostare.service.IUserService;

@Service("userService")
public class UserServiceImpl implements IUserService {

	@Autowired  
    private IUserDao userDao;  
	
	@Override
	public UserEntity getById(int id) {
        return userDao.selectUserById(id);
	}

	@Override
	public boolean checkLogin(UserEntity userEntity) {
		return false;
	}

}
