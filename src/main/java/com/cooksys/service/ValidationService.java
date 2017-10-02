package com.cooksys.service;

import org.springframework.stereotype.Service;

import com.cooksys.entity.Credentials;
import com.cooksys.entity.UserAccount;
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
		return hashtagRepository.findByLabelIgnoreCase(label) != null ? true : false;
	}

	public boolean checkCredentials(String username, Credentials credentials) {
		UserAccount userAccount = userRepository.findByCredentialsUsernameIgnoreCaseAndActiveTrue(username);
		if (credentials != null && userAccount != null && credentials.getPassword() != null
				&& credentials.getUsername() != null
				&& credentials.getUsername().equals(userAccount.getCredentials().getUsername())
				&& credentials.getPassword().equals(userAccount.getCredentials().getPassword())) {
			return true;
		} else {
			return false;
		}
	}
	

}
