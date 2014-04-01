package com.flamingo.studiostare.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.flamingo.studiostare.entity.AboutEntity;
import com.flamingo.studiostare.entity.CategoryEntity;
import com.flamingo.studiostare.entity.ClientEntity;
import com.flamingo.studiostare.entity.NewsEntity;
import com.flamingo.studiostare.entity.RoleEntity;
import com.flamingo.studiostare.entity.UserEntity;
import com.flamingo.studiostare.entity.VideoEntity;
import com.flamingo.studiostare.entity.VideoRefEntity;
import com.flamingo.studiostare.service.IAboutService;
import com.flamingo.studiostare.service.ICategoryService;
import com.flamingo.studiostare.service.IClientService;
import com.flamingo.studiostare.service.INewsService;
import com.flamingo.studiostare.service.IRoleService;
import com.flamingo.studiostare.service.IUserService;
import com.flamingo.studiostare.service.IVideoRefService;
import com.flamingo.studiostare.service.IVideoService;

@Controller  
@RequestMapping("test")  
public class Test {
	
	@Autowired
	private IAboutService aboutService;
	@Autowired
	private ICategoryService categoryService;
	@Autowired
	private IClientService clientService;
	@Autowired
	private INewsService newsService;
	@Autowired
	private IRoleService roleService;
	@Autowired
	private IUserService userService;
	@Autowired
	private IVideoService videoService;
	@Autowired
	private IVideoRefService videoRefService;
	
	@RequestMapping("test.do")
	public ModelAndView test() {
		ModelAndView m = new ModelAndView();
		int id = 1;
		AboutEntity aboutEntity = aboutService.getById(id);
		CategoryEntity categoryEntity = categoryService.getById(id);
		ClientEntity clientEntity = clientService.getById(id);
		NewsEntity newsEntity = newsService.getById(id);
		RoleEntity roleEntity = roleService.getById(id);
		UserEntity userEntity = userService.getById(id);
		VideoEntity videoEntity = videoService.getById(id);
		VideoRefEntity videoRefEntity = videoRefService.getById(id);
		m.addObject("about", aboutEntity == null ? new AboutEntity() : aboutEntity);
		m.addObject("category", categoryEntity == null ? new CategoryEntity() : categoryEntity);
		m.addObject("client", clientEntity == null ? new ClientEntity() : clientEntity);
		m.addObject("news", newsEntity == null ? new NewsEntity() : newsEntity);
		m.addObject("role", roleEntity == null ? new RoleEntity() : roleEntity);
		m.addObject("user", userEntity == null ? new UserEntity() : userEntity);
		m.addObject("video", videoEntity == null ? new VideoEntity() : videoEntity);
		m.addObject("videoref", videoRefEntity == null ? new VideoRefEntity() : videoRefEntity);
		m.setViewName("test");
		return m;
	}
	
}
