package com.cooksys.controller;

import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.dto.ContentCredentialDto;
import com.cooksys.dto.ReplyTweetDto;
import com.cooksys.dto.RepostTweetDto;
import com.cooksys.dto.SimpleTweetDto;
import com.cooksys.dto.TweetDto;
import com.cooksys.dto.UserAccountDto;
import com.cooksys.entity.Credentials;
import com.cooksys.entity.ReplyTweet;
import com.cooksys.entity.RepostTweet;
import com.cooksys.entity.SimpleTweet;
import com.cooksys.entity.UserAccount;
import com.cooksys.service.TweetService;

@RestController
@RequestMapping("tweets")
public class TweetController {
	
	
	
	private TweetService tweetService;

	public TweetController(TweetService tweetService)
	{
		this.tweetService = tweetService;
	}
	
	@GetMapping
	public List<TweetDto> getTweets()
	{
		return tweetService.getTweets();
	}
	
	@PostMapping
	public SimpleTweetDto createTweet(@RequestBody ContentCredentialDto contentCredentialDto, HttpServletResponse response)
	{
		SimpleTweetDto tweetDto = tweetService.createTweet(contentCredentialDto);
		
		response.setStatus(tweetDto != null ? HttpServletResponse.SC_OK : HttpServletResponse.SC_BAD_REQUEST);
		
		return tweetDto;
	}
	
	@GetMapping("{id}")
	public TweetDto getTweet(@PathVariable Integer id, HttpServletResponse response)
	{
		TweetDto tweetDto = tweetService.getTweet(id);
		
		response.setStatus(tweetDto != null ? HttpServletResponse.SC_OK : HttpServletResponse.SC_BAD_REQUEST);
		
		return tweetDto;
	}
	
	@DeleteMapping("{id}")
	public TweetDto deleteTweet(@PathVariable Integer id, @RequestBody Credentials credentials, HttpServletResponse response)
	{
		TweetDto tweetDto = tweetService.deleteTweet(id, credentials);
		
		response.setStatus(tweetDto != null ? HttpServletResponse.SC_OK : HttpServletResponse.SC_BAD_REQUEST);
		
		return tweetDto;
	}
	
	@PostMapping("{id}/repost")
	public RepostTweetDto repostTweet(@PathVariable Integer id, @RequestBody Credentials credentials, HttpServletResponse response)
	{
		RepostTweetDto tweetDto = tweetService.repostTweet(id, credentials);
		
		response.setStatus(tweetDto != null ? HttpServletResponse.SC_OK : HttpServletResponse.SC_BAD_REQUEST);
		
		return tweetDto;
	}
	
	@PostMapping("{id}/reply")
	public ReplyTweetDto replyTweet(@PathVariable Integer id, @RequestBody ContentCredentialDto contentCredentials, HttpServletResponse response)
	{
		ReplyTweetDto tweetDto = tweetService.replyTweet(id, contentCredentials);
		
		response.setStatus(tweetDto != null ? HttpServletResponse.SC_OK : HttpServletResponse.SC_BAD_REQUEST);
		
		return tweetDto;
	}
	
	@GetMapping("{id}/likes")
	public Set<UserAccountDto> getUsersWhoLiked(@PathVariable Integer id, HttpServletResponse response)
	{
		Set<UserAccountDto> usersWhoLiked = tweetService.getUsersWhoLiked(id);
		
		response.setStatus(usersWhoLiked != null ? HttpServletResponse.SC_OK : HttpServletResponse.SC_BAD_REQUEST);
		
		return usersWhoLiked;
	}
	
	@PostMapping("{id}/like")
	public void likeTweet(@PathVariable Integer id, @RequestBody Credentials credentials, HttpServletResponse response)
	{
		boolean success = tweetService.likeTweet(id, credentials);
		
		response.setStatus(success ? HttpServletResponse.SC_OK : HttpServletResponse.SC_BAD_REQUEST);
	}

}
