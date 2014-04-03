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
		ClientEntity clientEntity = new ClientEntity();
		List<ClientEntity> clientList = clientService.getClient(clientEntity);
		m.addObject("clientList", clientList);
		m.setViewName("manage/admin-client-list");
		return m;
	}
	
}
