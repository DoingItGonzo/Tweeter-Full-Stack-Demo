package com.cooksys.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.cooksys.dto.TweetDto;
import com.cooksys.entity.Tweet;

@Mapper(componentModel="spring", uses=UserMapper.class)
public interface TweetMapper {
	
	List<TweetDto> toDtos(List<Tweet> tweets);
	
	List<Tweet> fromDtos(List<TweetDto> tweetDtos);
	
	Tweet fromDto(TweetDto tweetDto);
	
	TweetDto toDto(Tweet tweet);
}
