package com.cooksys.mapper;

import java.util.List;
import java.util.Set;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.cooksys.dto.ReplyTweetDto;
import com.cooksys.dto.RepostTweetDto;
import com.cooksys.dto.SimpleTweetDto;
import com.cooksys.dto.TweetDto;
import com.cooksys.entity.ReplyTweet;
import com.cooksys.entity.RepostTweet;
import com.cooksys.entity.SimpleTweet;
import com.cooksys.entity.Tweet;

@Mapper(componentModel="spring", uses=UserMapper.class)
public interface TweetMapper {
	
	List<TweetDto> toDtos(List<Tweet> tweets);
	
	List<Tweet> fromDtos(List<TweetDto> tweetDtos);
	
	
	
	default Tweet fromDto(TweetDto tweetDto)
	{
		if (tweetDto instanceof SimpleTweetDto)
		{
			return fromDtoSimple((SimpleTweetDto) tweetDto);
		}
		else if (tweetDto instanceof RepostTweetDto)
		{
			return fromDtoRepost((RepostTweetDto) tweetDto);
		}
		else if (tweetDto instanceof ReplyTweetDto)
		{
			return fromDtoReply((ReplyTweetDto) tweetDto);
		}
		return null;
	}
	
	default TweetDto toDto(Tweet tweet)
	{
		if (tweet.isActive())
		{
			if (tweet instanceof SimpleTweet)
			{
				return toDtoSimple((SimpleTweet) tweet);
			}
			else if (tweet instanceof RepostTweet)
			{
				return toDtoRepost((RepostTweet) tweet);
			}
			else if (tweet instanceof ReplyTweet)
			{
				return toDtoReply((ReplyTweet) tweet);
			}
		}
		return null;
	}
	
	SimpleTweet fromDtoSimple(SimpleTweetDto simpleTweetDto);
	
	SimpleTweetDto toDtoSimple(SimpleTweet simpleTweet);
	
	RepostTweet fromDtoRepost(RepostTweetDto repostTweetDto);
	
	RepostTweetDto toDtoRepost(RepostTweet repostTweet);
	
	ReplyTweet fromDtoReply(ReplyTweetDto replyTweetDto);
	
	ReplyTweetDto toDtoReply(ReplyTweet replyTweet);
	
	Set<RepostTweetDto> toDtosRepost(Set<RepostTweet> tweets);
	
	Set<RepostTweet> fromDtosRepost(Set<RepostTweetDto> tweetDtos);
	
	Set<ReplyTweetDto> toDtosReply(Set<ReplyTweet> tweets);
	
	Set<ReplyTweet> fromDtosReply(Set<ReplyTweetDto> tweetDtos);
	
	Set<SimpleTweetDto> toDtosSimple(Set<SimpleTweet> tweets);
	
	Set<SimpleTweet> fromDtosSimple(Set<SimpleTweetDto> tweetDtos);

}
