package com.cooksys.service;

import org.springframework.stereotype.Service;

import com.cooksys.repository.HashtagRepository;
import com.cooksys.repository.UserRepository;

@Service
public class ValidationService {
	
	private UserRepository userRepository;
	private HashtagRepository hashtagRepository;

	public ValidationService(UserRepository userRepository, HashtagRepository hashtagRepository)
	{
		this.userRepository = userRepository;
		this.hashtagRepository = hashtagRepository;
	}
	
	public boolean checkUsernameAvailability(String username) {
		return userRepository.findByCredentialsUsernameIgnoreCase(username) == null ? true : false;
	}

	public boolean checkUsernameExists(String username) {
		return userRepository.findByCredentialsUsernameIgnoreCaseAndActiveTrue(username) != null ? true : false;
	}

	public boolean checkHashTagExists(String label) {
		return hashtagRepository.findByLabel(label) != null ? true : false;
	}
	

}
