package com.flamingo.studiostare.dao;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.flamingo.studiostare.entity.ClientEntity;

@Repository
@Transactional
public interface ClientDao {

	ClientEntity getClientById(int id);
	
}
