package com.cooksys.controller;

import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.dto.CredentialsProfileDto;
import com.cooksys.dto.UserAccountDto;
import com.cooksys.entity.UserAccount;
import com.cooksys.service.UserService;

@RestController
@RequestMapping("users")
public class UserController {
	
	private UserService userService;
	
	public UserController(UserService userService)
	{
		this.userService = userService;
	}
	
	@GetMapping
	public Set<UserAccountDto> getUsers()
	{
		return userService.getUsers();
	}
	
	@PostMapping
	public UserAccountDto createUser(@RequestBody CredentialsProfileDto credentialsProfileDto, HttpServletResponse response)
	{
		UserAccountDto uADto = userService.createUser(credentialsProfileDto);
		if (uADto == null)
		{
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		}
		else
		{
			response.setStatus(HttpServletResponse.SC_OK);
		}
		
		return uADto;
	}

}
