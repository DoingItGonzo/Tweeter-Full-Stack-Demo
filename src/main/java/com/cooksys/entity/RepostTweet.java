package com.cooksys.entity;

import javax.persistence.Entity;
import javax.persistence.OneToOne;

@Entity
public class RepostTweet extends Tweet {
	
	@OneToOne
	private Tweet repostOf;

	public Tweet getRepostOf() {
		return repostOf;
	}

	public void setRepostOf(Tweet repostOf) {
		this.repostOf = repostOf;
	}

}
