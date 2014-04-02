package com.flamingo.studiostare.service;

import java.util.List;

import com.flamingo.studiostare.entity.ClientEntity;

public interface IClientService {
	
	List<ClientEntity> getClient(ClientEntity clientEntity);
	
	void addClient(ClientEntity clientEntity);
	
	void updClient(ClientEntity clientEntity);
	
	void delClient(ClientEntity clientEntity);
	
}
