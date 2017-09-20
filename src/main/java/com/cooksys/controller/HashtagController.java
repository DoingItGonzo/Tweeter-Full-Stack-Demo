package com.cooksys.controller;

import java.util.Set;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.dto.HashtagDto;
import com.cooksys.service.HashtagService;


@RestController
@RequestMapping("tags")
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

}
