package com.flamingo.studiostare.dao;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.flamingo.studiostare.entity.RoleEntity;

@Repository
@Transactional
public interface RoleDao {

	RoleEntity getRoleById(int id);
	
}
