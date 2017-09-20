package com.cooksys.controller;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.dto.ContentCredentialDto;
import com.cooksys.dto.TweetDto;
import com.cooksys.dto.UserAccountDto;
import com.cooksys.entity.Credentials;
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
	public TweetDto createTweet(@RequestBody ContentCredentialDto contentCredentialDto, HttpServletResponse response)
	{
		TweetDto tweetDto = tweetService.createTweet(contentCredentialDto);
		
		response.setStatus(tweetDto != null ? HttpServletResponse.SC_OK : HttpServletResponse.SC_BAD_REQUEST);
		
		return tweetService.createTweet(contentCredentialDto);
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

}
