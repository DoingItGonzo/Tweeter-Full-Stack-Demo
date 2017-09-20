package com.cooksys.entity;

import javax.persistence.Entity;
import javax.persistence.OneToOne;

@Entity
public class ReplyTweet extends Tweet {
	
	private String content;
	
	@OneToOne
	private Tweet inReplyTo;

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Tweet getInReplyTo() {
		return inReplyTo;
	}

	public void setInReplyTo(Tweet inReplyTo) {
		this.inReplyTo = inReplyTo;
	}
	
}
