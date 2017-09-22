package com.cooksys.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.cooksys.dto.HashtagDto;
import com.cooksys.dto.TweetDto;
import com.cooksys.entity.Hashtag;
import com.cooksys.entity.Tweet;
import com.cooksys.mapper.HashtagMapper;
import com.cooksys.mapper.TweetMapper;
import com.cooksys.repository.HashtagRepository;

@Service
public class HashtagService {

	private HashtagRepository hashtagRepository;
	private HashtagMapper hashtagMapper;
	private TweetMapper tweetMapper;

	public HashtagService(HashtagRepository hashtagRepository, HashtagMapper hashtagMapper, TweetMapper tweetMapper)
	{
		this.hashtagRepository = hashtagRepository;
		this.hashtagMapper = hashtagMapper;
		this.tweetMapper = tweetMapper;
	}
	
	public Set<HashtagDto> getTags() {
		return hashtagMapper.toDtos(hashtagMapper.toSet(hashtagRepository.findAll()));
	}

	public List<TweetDto> getTaggedTweets(String label) {
		Hashtag hashtag = hashtagRepository.findByLabelIgnoreCase(label);
		
		if (hashtag != null)
		{
			List<TweetDto> taggedTweets = new ArrayList<TweetDto>();
			
			for (Tweet taggedTweet : hashtag.getTweetsWithTag())
			{
				if (taggedTweet.isActive())
				{
					taggedTweets.add(tweetMapper.toDto(taggedTweet));
				}
			}
			
			Collections.sort(taggedTweets, new Comparator<TweetDto>() {
				@Override
				public int compare(TweetDto o1, TweetDto o2) {
					return o2.getPosted().compareTo(o1.getPosted());
				}
			});
			
			return taggedTweets;
		}
		
		return null;
	}
}
