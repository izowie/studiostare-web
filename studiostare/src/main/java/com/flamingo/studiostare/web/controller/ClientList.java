package com.flamingo.studiostare.web.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.flamingo.studiostare.entity.ClientEntity;
import com.flamingo.studiostare.service.IClientService;

@Controller
@RequestMapping("manage")
public class ClientList {
	
	@Autowired
	private IClientService clientService;
	
	@RequestMapping("admin-client-list.html")
	public ModelAndView clientList() {
		ModelAndView m = new ModelAndView();
		m.setViewName("manage/admin-client-list");
		return m;
	}
	
	@RequestMapping("admin-client-list-test.html")
	public ModelAndView test() {
		ModelAndView m = new ModelAndView();
		ClientEntity clientEntity = new ClientEntity();
		List<ClientEntity> clientList = clientService.getClient(clientEntity);
		ClientEntity clientEntity2 = new ClientEntity();
		clientEntity2.setDescription("descripton2");
		clientEntity2.setEmail("email2");
		clientEntity2.setName("name2");
		clientEntity2.setPhone("phone2");
		clientService.addClient(clientEntity2);
		ClientEntity client3 = clientService.getClient(clientEntity2).get(0);
		client3.setName("name2-name2");
		clientService.updClient(client3);
		clientEntity2.setId(5);
		client3 = clientService.getClient(clientEntity2).get(0);
		client3.setName("name2-name2-updatebyid");
		clientService.updClient(client3);
		ClientEntity clientEntity4 = new ClientEntity();
		clientEntity4.setDescription("descripton4");
		clientEntity4.setEmail("email4");
		clientEntity4.setName("name4");
		clientEntity4.setPhone("phone4");
		clientService.addClient(clientEntity4);
		clientService.delClient(clientEntity4);
		clientEntity4.setId(4);
		clientService.delClient(clientEntity4);
		m.addObject("clientList", clientList);
		m.setViewName("manage/admin-client-list");
		return m;
	}
	
}
