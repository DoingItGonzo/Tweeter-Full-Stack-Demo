package com.cooksys.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.service.ValidationService;

@RestController
@RequestMapping("validate")
@CrossOrigin
public class ValidationController {
	
	private ValidationService validationService;

	public ValidationController(ValidationService validationService)
	{
		this.validationService = validationService;
	}
	
	@GetMapping("username/available/@{username}")
	public boolean checkUsernameAvailability(@PathVariable String username)
	{
		return validationService.checkUsernameAvailability(username);
	}
	
	@GetMapping("username/exists/@{username}")
	public boolean checkUsernameExists(@PathVariable String username)
	{
		return validationService.checkUsernameExists(username);
	}
	
	@GetMapping("tag/exists/{label}")
	public boolean checkHashtagExists(@PathVariable String label)
	{
		return validationService.checkHashTagExists(label);
	}

}
