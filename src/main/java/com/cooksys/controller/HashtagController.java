package com.cooksys.controller;

import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.dto.HashtagDto;
import com.cooksys.dto.TweetDto;
import com.cooksys.service.HashtagService;


@RestController
@RequestMapping("tags")
@CrossOrigin
public class HashtagController {
	
	private HashtagService hashtagService;
	
	public HashtagController(HashtagService hashtagService) {
		this.hashtagService = hashtagService;
	}
	
	@GetMapping
	public Set<HashtagDto> getTags()
	{
		return hashtagService.getTags();
	}
	
	@GetMapping("{label}")
	public List<TweetDto> getTaggedTweets(@PathVariable String label, HttpServletResponse response)
	{
		List<TweetDto> taggedTweets = hashtagService.getTaggedTweets(label);
		
		response.setStatus(taggedTweets != null ? HttpServletResponse.SC_OK : HttpServletResponse.SC_NOT_FOUND);
		
		return taggedTweets;
	}

}
