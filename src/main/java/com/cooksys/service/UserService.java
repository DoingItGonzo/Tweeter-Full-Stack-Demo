package com.cooksys.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.springframework.stereotype.Service;

import com.cooksys.dto.CredentialsProfileDto;
import com.cooksys.dto.TweetDto;
import com.cooksys.dto.UserAccountDto;
import com.cooksys.entity.Credentials;
import com.cooksys.entity.Tweet;
import com.cooksys.entity.UserAccount;
import com.cooksys.mapper.TweetMapper;
import com.cooksys.mapper.UserMapper;
import com.cooksys.repository.UserRepository;



@Service
public class UserService {

	private UserRepository userRepository;
	private UserMapper userMapper;
	private TweetMapper tweetMapper;

	public UserService(UserRepository userRepository, UserMapper userMapper, TweetMapper tweetMapper)
	{
		this.userRepository = userRepository;
		this.userMapper = userMapper;
		this.tweetMapper = tweetMapper;
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
			// User trying to take other person's account name or they dont have the right password
			if (userAccount.isActive() || credentialsProfileDto.getCredentials().getPassword() == null || 
					!credentialsProfileDto.getCredentials().getPassword().equals(userAccount.getCredentials().getPassword()))
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

	public Set<UserAccountDto> getFollowers(String username) {
		UserAccount userAccount = userRepository.findByCredentialsUsernameAndActiveTrue(username);
		
		if (userAccount == null)
		{
			return null;
		}
		
		Set<UserAccountDto> followersDto = new HashSet<UserAccountDto>();
		
		for (UserAccount follower : userAccount.getFollowers())
		{
			if (follower.isActive())
			{
				followersDto.add(userMapper.toDto(follower));
			}
		}
		
		return followersDto;
	}

	public Set<UserAccountDto> getFollowing(String username) {
		UserAccount userAccount = userRepository.findByCredentialsUsernameAndActiveTrue(username);
		
		if (userAccount == null)
		{
			return null;
		}
		
		
		
		Set<UserAccountDto> usersFollowingDto = new HashSet<UserAccountDto>();
		
		for (UserAccount userFollowing : userAccount.getFollowing())
		{
			if (userFollowing.isActive())
			{
				usersFollowingDto.add(userMapper.toDto(userFollowing));
			}
		}
		
		return usersFollowingDto;
	}

	public List<TweetDto> getTweets(String username) {
		UserAccount userAccount = userRepository.findByCredentialsUsernameAndActiveTrue(username);
		
		if (userAccount == null)
		{
			return null;
		}
		
		List<TweetDto> tweets = new ArrayList<TweetDto>();
		
		for(Tweet tweet : userAccount.getTweets())
		{
			if (tweet.isActive())
			{
				tweets.add(tweetMapper.toDto(tweet));
			}
		}
		
		Collections.sort(tweets, new Comparator<TweetDto>() {
			@Override
			public int compare(TweetDto o1, TweetDto o2) {
				return o2.getPosted().compareTo(o1.getPosted());
			}
		});
		
		return tweets;
	}

	public List<TweetDto> getFeed(String username) {
		UserAccount userAccount = userRepository.findByCredentialsUsernameAndActiveTrue(username);
		
		if (userAccount == null)
		{
			return null;
		}
		
		List<TweetDto> tweets = new ArrayList<TweetDto>();
		
		for(Tweet tweet : userAccount.getTweets())
		{
			if (tweet.isActive())
			{
				tweets.add(tweetMapper.toDto(tweet));
			}
		}
		
		for (UserAccount userFollowing : userAccount.getFollowing())
		{
			for (Tweet tweetOfUserFollowing : userFollowing.getTweets())
			{
				if (tweetOfUserFollowing.isActive())
				{
					tweets.add(tweetMapper.toDto(tweetOfUserFollowing));
				}
			}
		}
		
		Collections.sort(tweets, new Comparator<TweetDto>() {
			@Override
			public int compare(TweetDto o1, TweetDto o2) {
				return o2.getPosted().compareTo(o1.getPosted());
			}
		});
		
		return tweets;
	}

	public List<TweetDto> getTweetsMentionedIn(String username) {
		UserAccount userAccount = userRepository.findByCredentialsUsernameAndActiveTrue(username);
		
		if (userAccount == null)
		{
			return null;
		}
		
		List<TweetDto> tweets = new ArrayList<TweetDto>();
		
		for(Tweet tweet : userAccount.getMentionedIn())
		{
			if (tweet.isActive())
			{
				tweets.add(tweetMapper.toDto(tweet));
			}
		}
		
		Collections.sort(tweets, new Comparator<TweetDto>() {
			@Override
			public int compare(TweetDto o1, TweetDto o2) {
				return o2.getPosted().compareTo(o1.getPosted());
			}
		});
		
		return tweets;
	}
	
	
	
	
	
	
	
	

}
