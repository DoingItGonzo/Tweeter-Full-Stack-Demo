package com.cooksys.service;

import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Set;

import org.hibernate.exception.ConstraintViolationException;
import org.postgresql.util.PSQLException;
import org.springframework.stereotype.Service;

import com.cooksys.dto.CredentialsProfileDto;
import com.cooksys.dto.UserAccountDto;
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
		UserAccount userAccount = new UserAccount();
		userAccount.setProfile(credentialsProfileDto.getProfile());
		userAccount.setCredentials(credentialsProfileDto.getCredentials());
		userAccount.setJoined(new Timestamp(System.currentTimeMillis()));
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
		
		return userMapper.toDto(userAccount);
	}

}
