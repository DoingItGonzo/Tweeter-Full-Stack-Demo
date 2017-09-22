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

	public UserService(UserRepository userRepository, UserMapper userMapper, TweetMapper tweetMapper) {
		this.userRepository = userRepository;
		this.userMapper = userMapper;
		this.tweetMapper = tweetMapper;
	}

	public Set<UserAccountDto> getUsers() {
		return userMapper.toDtoSet(userRepository.findByActiveTrue());
	}

	public UserAccountDto createUser(CredentialsProfileDto credentialsProfileDto) {
		// Continue only if the credentials password and username are there
		if (credentialsProfileDto != null && credentialsProfileDto.getCredentials() != null
				&& credentialsProfileDto.getCredentials().getUsername() != null
				&& credentialsProfileDto.getCredentials().getPassword() != null) {
			UserAccount userAccount = userRepository
					.findByCredentialsUsernameIgnoreCase(credentialsProfileDto.getCredentials().getUsername());

			// No user with that username
			if (userAccount == null && credentialsProfileDto.getProfile() != null
					&& credentialsProfileDto.getProfile().getEmail() != null) {
				// Create a user and save them to the database
				userAccount = new UserAccount();
				userAccount.setProfile(credentialsProfileDto.getProfile());
				userAccount.setCredentials(credentialsProfileDto.getCredentials());
				userAccount.setJoined(new Timestamp(System.currentTimeMillis()));
				userAccount.setActive(true);
				userRepository.save(userAccount);
				return userMapper.toDto(userAccount);
			}
			// User reactivating account or someone trying to use a username
			// that is already active
			else {
				// User reactivating account
				if (doesUserHaveCorrectCredentials(userAccount, credentialsProfileDto.getCredentials())
						&& !userAccount.isActive()) {
					userAccount.setActive(true);
					userRepository.save(userAccount);
					return userMapper.toDto(userAccount);
				}
			}
		}

		return null;

	}

	public UserAccountDto updateProfile(String username, CredentialsProfileDto credentialsProfileDto) {
		UserAccount userAccount = userRepository.findByCredentialsUsernameIgnoreCaseAndActiveTrue(username);

		// Allow user to edit profile only if they have right password
		if (credentialsProfileDto != null
				&& doesUserHaveCorrectCredentials(userAccount, credentialsProfileDto.getCredentials())) {
			// Map the new profile to the old profile using MapStruct only if
			// the field in the new profile is not equal to null
			userMapper.updateProfile(credentialsProfileDto.getProfile(), userAccount.getProfile());
			userRepository.save(userAccount);
			return userMapper.toDto(userAccount);
		}
		return null;
	}

	public UserAccountDto getUser(String username) {
		return userMapper.toDto(userRepository.findByCredentialsUsernameIgnoreCaseAndActiveTrue(username));
	}

	public UserAccountDto deleteUser(String username, Credentials credentials) {
		UserAccount userAccount = userRepository.findByCredentialsUsernameIgnoreCaseAndActiveTrue(username);
		// Allow user to delete user only if they have right password
		if (doesUserHaveCorrectCredentials(userAccount, credentials)) {
			// Don't actually delete him, just make him inactive
			userAccount.setActive(false);
			userRepository.save(userAccount);
			return userMapper.toDto(userAccount);
		}

		return null;
	}

	public boolean followUser(String usernameToFollow, Credentials credentialsOfFollower) {
		boolean ableToFollow = false;
		// Continue only if the credentials password and username are there
		if (credentialsOfFollower != null) {
			UserAccount userToFollow = userRepository
					.findByCredentialsUsernameIgnoreCaseAndActiveTrue(usernameToFollow);
			UserAccount follower = userRepository
					.findByCredentialsUsernameIgnoreCaseAndActiveTrue(credentialsOfFollower.getUsername());

			// If either user doesnt exist or the follower doesnt have the right
			// password and user is not trying to follow themself
			if (userToFollow != null && doesUserHaveCorrectCredentials(follower, credentialsOfFollower) && userToFollow != follower) {
				ableToFollow = userToFollow.getFollowers().add(follower);
				userRepository.save(userToFollow);
			}
		}

		return ableToFollow;
	}

	public boolean unfollowUser(String usernameToFollow, Credentials credentialsOfFollower) {
		boolean ableToUnfollow = false;
		// Continue only if the credentials password and username are there
		if (credentialsOfFollower != null) {
			UserAccount userToUnfollow = userRepository
					.findByCredentialsUsernameIgnoreCaseAndActiveTrue(usernameToFollow);
			UserAccount unfollower = userRepository
					.findByCredentialsUsernameIgnoreCaseAndActiveTrue(credentialsOfFollower.getUsername());

			// If either user doesnt exist or the unfollower doesnt have the
			// right password or the unfollower doesnt follow the user
			if (userToUnfollow != null && doesUserHaveCorrectCredentials(unfollower, credentialsOfFollower)) {
				ableToUnfollow = userToUnfollow.getFollowers().remove(unfollower);
				userRepository.save(userToUnfollow);
				
			}
		}

		return ableToUnfollow;
	}

	public Set<UserAccountDto> getFollowers(String username) {
		UserAccount userAccount = userRepository.findByCredentialsUsernameIgnoreCaseAndActiveTrue(username);

		Set<UserAccountDto> followersDto = null;

		if (userAccount != null) {
			followersDto = getActiveUserDtos(userAccount.getFollowers());
		}

		return followersDto;
	}

	public Set<UserAccountDto> getFollowing(String username) {
		UserAccount userAccount = userRepository.findByCredentialsUsernameIgnoreCaseAndActiveTrue(username);

		Set<UserAccountDto> usersFollowingDto = null;

		if (userAccount != null) {
			usersFollowingDto = getActiveUserDtos(userAccount.getFollowing());
		}

		return usersFollowingDto;
	}

	public List<TweetDto> getTweets(String username) {
		UserAccount userAccount = userRepository.findByCredentialsUsernameIgnoreCaseAndActiveTrue(username);

		List<TweetDto> tweets = null;

		if (userAccount != null) {
			tweets = getActiveTweetDtos(userAccount.getTweets());

			sortTweets(tweets);
		}

		return tweets;
	}

	public List<TweetDto> getFeed(String username) {
		UserAccount userAccount = userRepository.findByCredentialsUsernameIgnoreCaseAndActiveTrue(username);

		List<TweetDto> tweets = null;

		if (userAccount != null) {
			tweets = getActiveTweetDtos(userAccount.getTweets());

			for (UserAccount userFollowing : userAccount.getFollowing()) {
				if (userFollowing.isActive())
				{
					tweets.addAll(getActiveTweetDtos(userFollowing.getTweets()));
				}
			}

			sortTweets(tweets);
		}

		return tweets;
	}

	public List<TweetDto> getTweetsMentionedIn(String username) {
		UserAccount userAccount = userRepository.findByCredentialsUsernameIgnoreCaseAndActiveTrue(username);

		List<TweetDto> tweets = null;

		if (userAccount != null) {
			tweets = getActiveTweetDtos(userAccount.getMentionedIn());

			sortTweets(tweets);
		}

		return tweets;
	}

	/**
	 * Check the credentials for any null fields and also check if the user's
	 * username and password meet the credentials username and password
	 * 
	 * @param user
	 *            The user to check
	 * @param credentials
	 *            The credentials to check
	 * @return true if all needed fields are not null and the user's username
	 *         and password are equal to the credenials username and password.
	 *         false otherwise
	 */
	private boolean doesUserHaveCorrectCredentials(UserAccount user, Credentials credentials) {
		if (credentials != null && user != null && credentials.getPassword() != null
				&& credentials.getUsername() != null
				&& credentials.getUsername().equals(user.getCredentials().getUsername())
				&& credentials.getPassword().equals(user.getCredentials().getPassword())) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Get the active tweets from tweets and turn them into dtos
	 * 
	 * @param tweets
	 *            list of tweets to check for activity
	 * @return A list of the dto form of the tweets that are active
	 */
	private List<TweetDto> getActiveTweetDtos(Set<Tweet> tweets) {
		List<TweetDto> activeTweetDtos = new ArrayList<TweetDto>();

		for (Tweet tweet : tweets) {
			if (tweet.isActive()) {
				activeTweetDtos.add(tweetMapper.toDto(tweet));
			}
		}

		return activeTweetDtos;
	}

	/**
	 * Get the active users from users and turn them into dtos
	 * 
	 * @param users
	 *            list of users to check for activity
	 * @return A list of the dto form of the users that are active
	 */
	private Set<UserAccountDto> getActiveUserDtos(Set<UserAccount> users) {
		Set<UserAccountDto> activeUserDtos = new HashSet<UserAccountDto>();

		for (UserAccount user : users) {
			if (user.isActive()) {
				activeUserDtos.add(userMapper.toDto(user));
			}
		}

		return activeUserDtos;
	}

	/**
	 * Sort the list of tweetDto using posted time from newest to oldest
	 * 
	 * @param tweetDtos
	 *            The list of tweets to be sorted
	 */
	private void sortTweets(List<TweetDto> tweetDtos) {
		Collections.sort(tweetDtos, new Comparator<TweetDto>() {
			@Override
			public int compare(TweetDto o1, TweetDto o2) {
				return o2.getPosted().compareTo(o1.getPosted());
			}
		});
	}
}
