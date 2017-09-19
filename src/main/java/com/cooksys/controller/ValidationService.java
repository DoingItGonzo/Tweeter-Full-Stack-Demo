package com.cooksys.controller;

import org.springframework.stereotype.Service;

import com.cooksys.repository.UserRepository;

@Service
public class ValidationService {
	
	private UserRepository userRepository;

	public ValidationService(UserRepository userRepository)
	{
		this.userRepository = userRepository;
	}
	
	public boolean checkUsernameAvailability(String username) {
		return userRepository.findByCredentialsUsername(username) == null ? true : false;
	}

	public boolean checkUsernameExists(String username) {
		return userRepository.findByCredentialsUsernameAndActiveTrue(username) != null ? true : false;
	}
	

}
