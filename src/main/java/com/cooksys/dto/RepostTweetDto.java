package com.cooksys.dto;



public class RepostTweetDto extends TweetDto {

	private TweetDto repostOf;

	public TweetDto getRepostOf() {
		return repostOf;
	}

	public void setRepostOf(TweetDto repostOf) {
		this.repostOf = repostOf;
	}
}
