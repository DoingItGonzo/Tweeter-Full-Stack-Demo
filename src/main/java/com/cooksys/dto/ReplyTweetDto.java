package com.cooksys.dto;


public class ReplyTweetDto  extends SimpleTweetDto {
	
	private TweetDto inReplyTo;

	public TweetDto getInReplyTo() {
		return inReplyTo;
	}

	public void setInReplyTo(TweetDto inReplyTo) {
		this.inReplyTo = inReplyTo;
	}
	
}
