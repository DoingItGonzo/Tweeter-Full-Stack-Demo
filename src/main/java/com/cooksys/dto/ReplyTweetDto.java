package com.cooksys.dto;


public class ReplyTweetDto  extends TweetDto {

private String content;
	
	private TweetDto inReplyTo;

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public TweetDto getInReplyTo() {
		return inReplyTo;
	}

	public void setInReplyTo(TweetDto inReplyTo) {
		this.inReplyTo = inReplyTo;
	}
	
}
