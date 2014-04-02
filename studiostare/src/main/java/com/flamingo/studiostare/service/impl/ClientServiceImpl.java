package com.flamingo.studiostare.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.flamingo.studiostare.dao.IClientDao;
import com.flamingo.studiostare.entity.ClientEntity;
import com.flamingo.studiostare.service.IClientService;

@Service("clientService")
public class ClientServiceImpl implements IClientService {

	@Autowired
	private IClientDao clientDao;
	
	@Override
	public List<ClientEntity> getClient(ClientEntity clientEntity) {
		int id = clientEntity.getId();
		if(id != 0)
			return clientDao.selectClientById(id);
		return clientDao.selectClient();
	}

	@Override
	public void addClient(ClientEntity clientEntity) {
		clientDao.insertClient(clientEntity);
	}

	@Override
	public void updClient(ClientEntity clientEntity) {
		clientDao.updateClient(clientEntity);
	}

	@Override
	public void delClient(ClientEntity clientEntity){
		int id = clientEntity.getId();
		if(id != 0)
			clientDao.deleteClientById(id);
		else
			clientDao.deleteClient(clientEntity);
	}

	

}
