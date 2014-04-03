package com.flamingo.studiostare.dao;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.flamingo.studiostare.entity.RoleEntity;

@Repository
@Transactional
public interface IRoleDao {

	RoleEntity selectRoleById(int id);

	void insertRole(RoleEntity roleEntity);

	void updateRole(RoleEntity roleEntity);

	void deleteRoleById(int id);

	List<RoleEntity> selectRole(RoleEntity roleEntity);

	void deleteRole(RoleEntity roleEntity);

}
