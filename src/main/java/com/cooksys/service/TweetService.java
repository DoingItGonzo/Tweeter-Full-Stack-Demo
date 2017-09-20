package com.cooksys.service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.cooksys.dto.ContentCredentialDto;
import com.cooksys.dto.TweetDto;
import com.cooksys.entity.Credentials;
import com.cooksys.entity.Tweet;
import com.cooksys.entity.UserAccount;
import com.cooksys.mapper.TweetMapper;
import com.cooksys.repository.TweetRepoistory;
import com.cooksys.repository.UserRepository;

@Service
public class TweetService {

	private TweetRepoistory tweetRepository;
	private TweetMapper tweetMapper;
	private UserRepository userRepository;

	public TweetService(TweetRepoistory tweetRepoistory, TweetMapper tweetMapper, UserRepository userRepository)
	{
		this.tweetRepository = tweetRepoistory;
		this.tweetMapper = tweetMapper;
		this.userRepository = userRepository;
	}
	
	public List<TweetDto> getTweets() {
		return tweetMapper.toDtos(tweetRepository.findByActiveTrueOrderByPostedDesc());
	}

	public TweetDto createTweet(ContentCredentialDto contentCredentialDto) {
		UserAccount userAccount = userRepository.findByCredentialsUsernameAndActiveTrue(contentCredentialDto.getCredentials().getUsername());
		
		// Allow user to create tweet only if they have correct password
		if (userAccount == null || 
				contentCredentialDto.getCredentials().getPassword() == null || 
				!contentCredentialDto.getCredentials().getPassword().equals(userAccount.getCredentials().getPassword()))
		{
			return null;
		}
		else
		{
			Tweet tweet = new Tweet();
			tweet.setAuthor(userAccount);
			tweet.setPosted(new Timestamp(System.currentTimeMillis()));
			tweet.setContent(contentCredentialDto.getContent());
			tweet.setActive(true);
			tweetRepository.save(tweet);
			return tweetMapper.toDto(tweet);
		}
	}

	public TweetDto getTweet(Integer id) {
		return tweetMapper.toDto(tweetRepository.findByIdAndActiveTrue(id));
	}

	public TweetDto deleteTweet(Integer id, Credentials credentials) {
		//UserAccount userAccount = userRepository.findByCredentialsUsernameAndActiveTrue(credentials.getUsername());
		Tweet tweet = tweetRepository.findByIdAndActiveTrue(id);
		
		// Allow user to delete tweet only if they match author credentials
		if (tweet == null ||
				credentials.getPassword() == null || credentials.getUsername() == null ||
				!credentials.getPassword().equals(tweet.getAuthor().getCredentials().getPassword()) || 
				!credentials.getUsername().equals(tweet.getAuthor().getCredentials().getUsername()))
		{
			return null;
		} 
		else
		{
			tweet.setActive(false);
			tweetRepository.save(tweet);
			return tweetMapper.toDto(tweet);
		}
	}

}
