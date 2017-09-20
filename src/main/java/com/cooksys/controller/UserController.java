package com.cooksys.controller;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.dto.CredentialsProfileDto;
import com.cooksys.dto.TweetDto;
import com.cooksys.dto.UserAccountDto;
import com.cooksys.entity.Credentials;
import com.cooksys.entity.Tweet;
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
		
		response.setStatus(uADto != null ? HttpServletResponse.SC_OK : HttpServletResponse.SC_BAD_REQUEST);
		
		return uADto;
	}
	
	@PatchMapping("@{username}")
	public UserAccountDto updateProfile(@PathVariable String username, @RequestBody CredentialsProfileDto credentialsProfileDto, HttpServletResponse response)
	{
		UserAccountDto uADto = userService.updateProfile(username, credentialsProfileDto);
		
		response.setStatus(uADto != null ? HttpServletResponse.SC_OK : HttpServletResponse.SC_BAD_REQUEST);
		
		return uADto;
	}
	
	@GetMapping("@{username}")
	public UserAccountDto getUser(@PathVariable String username, HttpServletResponse response)
	{
		UserAccountDto uADto = userService.getUser(username);
		
		response.setStatus(uADto != null ? HttpServletResponse.SC_OK : HttpServletResponse.SC_NOT_FOUND);
		
		return uADto;
	}

	@DeleteMapping("@{username}")
	public UserAccountDto deleteUser(@PathVariable String username, @RequestBody Credentials credentials, HttpServletResponse response)
	{
		UserAccountDto uADto = userService.deleteUser(username, credentials);
		
		response.setStatus(uADto != null ? HttpServletResponse.SC_OK : HttpServletResponse.SC_BAD_REQUEST);
		
		return uADto;
	}
	
	@PostMapping("@{username}/follow")
	public void followUser(@PathVariable String username, @RequestBody Credentials credentialsOfFollower, HttpServletResponse response)
	{
		response.setStatus(userService.followUser(username, credentialsOfFollower) ? HttpServletResponse.SC_OK : HttpServletResponse.SC_BAD_REQUEST);
	}
	
	@PostMapping("@{username}/unfollow")
	public void unfollowUser(@PathVariable String username, @RequestBody Credentials credentialsOfFollower, HttpServletResponse response)
	{
		response.setStatus(userService.unfollowUser(username, credentialsOfFollower) ? HttpServletResponse.SC_OK : HttpServletResponse.SC_BAD_REQUEST);
	}
	
	@GetMapping("@{username}/followers")
	public Set<UserAccountDto> getFollowers(@PathVariable String username, HttpServletResponse response)
	{
		Set<UserAccountDto> uADtos = userService.getFollowers(username);
		
		response.setStatus(uADtos != null ? HttpServletResponse.SC_OK : HttpServletResponse.SC_BAD_REQUEST);
		
		return uADtos;
	}
	
	@GetMapping("@{username}/following")
	public Set<UserAccountDto> getFollowing(@PathVariable String username, HttpServletResponse response)
	{
		Set<UserAccountDto> uADtos = userService.getFollowing(username);
		
		response.setStatus(uADtos != null ? HttpServletResponse.SC_OK : HttpServletResponse.SC_BAD_REQUEST);
		
		return uADtos;
	}
	
	@GetMapping("@{username}/tweets")
	public List<TweetDto> getTweets(@PathVariable String username, HttpServletResponse response)
	{
		List<TweetDto> getTweets = userService.getTweets(username);
		
		response.setStatus(getTweets != null ? HttpServletResponse.SC_OK : HttpServletResponse.SC_BAD_REQUEST);
		
		return getTweets;
	}
	
	@GetMapping("@{username}/feed")
	public List<TweetDto> getFeed(@PathVariable String username, HttpServletResponse response)
	{
		List<TweetDto> getFeed = userService.getFeed(username);
		
		response.setStatus(getFeed != null ? HttpServletResponse.SC_OK : HttpServletResponse.SC_BAD_REQUEST);
		
		return getFeed;
	}
	
	@GetMapping("@{username}/mentions")
	public List<TweetDto> getTweetsMentionedIn(@PathVariable String username, HttpServletResponse response)
	{
		List<TweetDto> tweetsMentionedIn = userService.getTweetsMentionedIn(username);
		
		response.setStatus(tweetsMentionedIn != null ? HttpServletResponse.SC_OK : HttpServletResponse.SC_BAD_REQUEST);
		
		return tweetsMentionedIn;
	}
	
	
}
