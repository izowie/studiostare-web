package com.flamingo.studiostare.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.flamingo.studiostare.service.IClientService;

@Controller
@RequestMapping("manage")
public class NewsEdit {
	
	@Autowired
	private IClientService clientService;
	
	@RequestMapping("admin-news-edit.html")
	public ModelAndView newsEdit() {
		ModelAndView m = new ModelAndView();
		m.setViewName("manage/admin-news-edit");
		return m;
	}
	
}
