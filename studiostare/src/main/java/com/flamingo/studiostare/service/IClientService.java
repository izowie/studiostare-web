package com.flamingo.studiostare.service;

import java.util.List;

import com.flamingo.studiostare.entity.ClientEntity;

public interface IClientService {
	
	ClientEntity getClientById(int id);
	
	List<ClientEntity> getClient(ClientEntity clientEntity);
	
	List<ClientEntity> getAllClient();
	
	void addClient(ClientEntity clientEntity);
	
	void updClient(ClientEntity clientEntity);
	
	void delClient(ClientEntity clientEntity);
	
}
