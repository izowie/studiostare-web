package com.flamingo.studiostare.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.flamingo.studiostare.dao.ClientDao;
import com.flamingo.studiostare.entity.ClientEntity;
import com.flamingo.studiostare.service.IClientService;

@Service("clientService")
public class ClientServiceImpl implements IClientService {

	@Autowired
	private ClientDao clientDao;
	
	@Override
	public ClientEntity getById(int id) {
		return clientDao.getClientById(id);
	}

}
