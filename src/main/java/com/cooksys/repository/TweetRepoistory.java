package com.cooksys.repository;


import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cooksys.entity.ReplyTweet;
import com.cooksys.entity.RepostTweet;
import com.cooksys.entity.Tweet;

public interface TweetRepoistory extends JpaRepository<Tweet, Integer>{

	Tweet findByIdAndActiveTrue(Integer id);
	
	List<Tweet> findByActiveTrueOrderByPostedDesc();
	
	Set<RepostTweet> findAllByRepostOfId(Integer id);

	Set<ReplyTweet> findAllByInReplyToId(Integer id);
	
}
