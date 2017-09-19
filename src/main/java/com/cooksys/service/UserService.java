package com.cooksys.service;

import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

import javax.servlet.http.HttpServletResponse;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.stereotype.Service;

import com.cooksys.dto.CredentialsProfileDto;
import com.cooksys.dto.UserAccountDto;
import com.cooksys.entity.Credentials;
import com.cooksys.entity.UserAccount;
import com.cooksys.mapper.UserMapper;
import com.cooksys.repository.UserRepository;



@Service
public class UserService {

	private UserRepository userRepository;
	private UserMapper userMapper;
	private final String SQL_UNIQUE_DUPLICATE = "23505";

	public UserService(UserRepository userRepository, UserMapper userMapper)
	{
		this.userRepository = userRepository;
		this.userMapper = userMapper;
	}
	
	public Set<UserAccountDto> getUsers() {
		return userMapper.toDtoSet(userMapper.toSetFromList(userRepository.findAll()));
	}

	public UserAccountDto createUser(CredentialsProfileDto credentialsProfileDto) {
		UserAccount userAccount = userRepository.findByCredentialsUsername(credentialsProfileDto.getCredentials().getUsername());
		
		// No user with that username
		if (userAccount == null)
		{
			userAccount = new UserAccount();
			userAccount.setProfile(credentialsProfileDto.getProfile());
			userAccount.setCredentials(credentialsProfileDto.getCredentials());
			userAccount.setJoined(new Timestamp(System.currentTimeMillis()));
			userAccount.setActive(true);
			try {
				userRepository.save(userAccount);
			} catch (RuntimeException e) {
				/*Throwable cause = e.getCause();
				if (cause instanceof ConstraintViolationException)
				{
					ConstraintViolationException cve = (ConstraintViolationException) cause;
					if (cve.getSQLState().equals(SQL_UNIQUE_DUPLICATE))
					{
						return null;
					}
				}*/
				return null;
			}
		}
		// User reactivated account
		else
		{
			// User trying to take other person's account name
			if (userAccount.isActive())
			{
				return null;
			}
			// User reactivating account
			else
			{
				userAccount.setActive(true);
			}
		}
		
	
		
		return userMapper.toDto(userAccount);
	}

	public UserAccountDto updateProfile(String username, CredentialsProfileDto credentialsProfileDto) {
		UserAccount userAccount = userRepository.findByCredentialsUsername(username);
		
		// Allow user to edit profile only if they have right password
		if (userAccount == null || 
				credentialsProfileDto.getCredentials().getPassword() == null || 
				!credentialsProfileDto.getCredentials().getPassword().equals(userAccount.getCredentials().getPassword()))
		{
			return null;
		}
		else
		{
			userMapper.updateProfile(credentialsProfileDto.getProfile(), userAccount.getProfile());
			userRepository.save(userAccount);
			return userMapper.toDto(userAccount);
		}
		
	}

	public UserAccountDto getUser(String username) {
		return userMapper.toDto(userRepository.findByCredentialsUsername(username));
	}

	public UserAccountDto deleteUser(String username, Credentials credentials) {
		UserAccount userAccount = userRepository.findByCredentialsUsername(username);
		// Allow user to delete profile only if they have right password
		// Allow user to edit profile only if they have right password
		if (userAccount == null || 
				credentials.getPassword() == null || 
				!credentials.getPassword().equals(userAccount.getCredentials().getPassword()))
		{
			return null;
		}
		else
		{
			userAccount.setActive(false);
			userRepository.save(userAccount);
			return userMapper.toDto(userAccount);
		}
	}

}
