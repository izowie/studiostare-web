package com.flamingo.studiostare.dao;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.flamingo.studiostare.entity.ClientEntity;

@Repository
@Transactional
public interface IClientDao {

	List<ClientEntity> selectClientById(int id);
	
	void insertClient(ClientEntity clientEntity);
	
	void updateClient(ClientEntity clientEntity);
	
	void deleteClientById(int id);

	List<ClientEntity> selectClient();

	void deleteClient(ClientEntity clientEntity);
	
}
