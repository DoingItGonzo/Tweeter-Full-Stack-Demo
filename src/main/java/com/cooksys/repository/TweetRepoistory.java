package com.cooksys.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cooksys.entity.Tweet;

public interface TweetRepoistory extends JpaRepository<Tweet, Integer>{

	Tweet findByIdAndActiveTrue(Integer id);
	
	List<Tweet> findByActiveTrueOrderByPostedDesc();
	
}
