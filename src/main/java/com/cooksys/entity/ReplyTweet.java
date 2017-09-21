package com.cooksys.entity;

import javax.persistence.Entity;
import javax.persistence.OneToOne;

@Entity
public class ReplyTweet extends SimpleTweet {
	
	@OneToOne
	private Tweet inReplyTo;

	public Tweet getInReplyTo() {
		return inReplyTo;
	}

	public void setInReplyTo(Tweet inReplyTo) {
		this.inReplyTo = inReplyTo;
	}
	
}
