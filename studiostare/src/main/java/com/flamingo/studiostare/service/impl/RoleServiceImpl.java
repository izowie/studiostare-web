package com.flamingo.studiostare.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.flamingo.studiostare.dao.RoleDao;
import com.flamingo.studiostare.entity.RoleEntity;
import com.flamingo.studiostare.service.IRoleService;

@Service("roleService")
public class RoleServiceImpl implements IRoleService {

	@Autowired
	private RoleDao roleDao;
	
	@Override
	public RoleEntity getById(int id) {
		return roleDao.getRoleById(id);
	}

}
