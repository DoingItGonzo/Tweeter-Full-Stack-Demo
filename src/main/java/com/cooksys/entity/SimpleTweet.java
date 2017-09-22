package com.cooksys.entity;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
public class SimpleTweet extends Tweet {

	private String content;

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	
}
