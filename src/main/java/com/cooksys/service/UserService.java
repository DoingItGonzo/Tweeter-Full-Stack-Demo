package com.cooksys.service;

import java.sql.Timestamp;
import java.util.Set;
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

	public UserService(UserRepository userRepository, UserMapper userMapper)
	{
		this.userRepository = userRepository;
		this.userMapper = userMapper;
	}
	
	public Set<UserAccountDto> getUsers() {
		return userMapper.toDtoSet(userRepository.findByActiveTrue());
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
				return null;
			}
		}
		// User reactivating account
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
				userRepository.save(userAccount);
			}
		}
		
		return userMapper.toDto(userAccount);
	}

	public UserAccountDto updateProfile(String username, CredentialsProfileDto credentialsProfileDto) {
		UserAccount userAccount = userRepository.findByCredentialsUsernameAndActiveTrue(username);
		
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
		return userMapper.toDto(userRepository.findByCredentialsUsernameAndActiveTrue(username));
	}

	public UserAccountDto deleteUser(String username, Credentials credentials) {
		UserAccount userAccount = userRepository.findByCredentialsUsernameAndActiveTrue(username);
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

	public boolean followUser(String usernameToFollow, Credentials credentialsOfFollower) {
		UserAccount userToFollow = userRepository.findByCredentialsUsernameAndActiveTrue(usernameToFollow);
		UserAccount follower = userRepository.findByCredentialsUsernameAndActiveTrue(credentialsOfFollower.getUsername());
		
		// If either user doesnt exist or the follower doesnt have the right password or the follower already follows the user 
		if (userToFollow == null || follower == null 
				|| !credentialsOfFollower.getPassword().equals(follower.getCredentials().getPassword()) ||
				userToFollow.getFollowers().contains(follower))
		{
			return false;
		}
		else
		{
			userToFollow.getFollowers().add(follower);
			userRepository.save(userToFollow);
			return true;
		}
	}

	public boolean unfollowUser(String usernameToFollow, Credentials credentialsOfFollower) {
		UserAccount userToUnfollow = userRepository.findByCredentialsUsernameAndActiveTrue(usernameToFollow);
		UserAccount unfollower = userRepository.findByCredentialsUsernameAndActiveTrue(credentialsOfFollower.getUsername());
		
		// If either user doesnt exist or the unfollower doesnt have the right password or the unfollower doesnt follow the user 
		if (userToUnfollow == null || unfollower == null 
				|| !credentialsOfFollower.getPassword().equals(unfollower.getCredentials().getPassword()) ||
				!userToUnfollow.getFollowers().contains(unfollower))
		{
			return false;
		}
		else
		{
			userToUnfollow.getFollowers().remove(unfollower);
			userRepository.save(userToUnfollow);
			return true;
		}
	}
	
	
	
	

}
