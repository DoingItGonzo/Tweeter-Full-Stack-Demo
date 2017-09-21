package com.cooksys.entity;

import java.sql.Timestamp;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

@Entity
public class UserAccount {
	
	@Id
	@GeneratedValue
	private Integer id;
	
	@Embedded
	private Credentials credentials;
	
	@Embedded
	private Profile profile;
	
	@Column(nullable=false, updatable=false)
	private Timestamp joined;
	
	@Column(nullable=false)
	private boolean active;
	
	@ManyToMany
	private Set<UserAccount> followers;
	
	@ManyToMany(mappedBy="followers")
	private Set<UserAccount> following;
	
	@OneToMany(mappedBy="author")
	private Set<Tweet> tweets;
	
	@ManyToMany(mappedBy="mentions")
	private Set<Tweet> mentionedIn;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Credentials getCredentials() {
		return credentials;
	}

	public void setCredentials(Credentials credentials) {
		this.credentials = credentials;
	}

	public Profile getProfile() {
		return profile;
	}

	public void setProfile(Profile profile) {
		this.profile = profile;
	}

	public Timestamp getJoined() {
		return joined;
	}

	public void setJoined(Timestamp joined) {
		this.joined = joined;
	}
	
	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}
	
	public Set<UserAccount> getFollowers() {
		return followers;
	}

	public void setFollowers(Set<UserAccount> followers) {
		this.followers = followers;
	}
	
	public Set<UserAccount> getFollowing() {
		return following;
	}

	public void setFollowing(Set<UserAccount> following) {
		this.following = following;
	}

	public Set<Tweet> getTweets() {
		return tweets;
	}

	public void setTweets(Set<Tweet> tweets) {
		this.tweets = tweets;
	}
	
	public Set<Tweet> getMentionedIn() {
		return mentionedIn;
	}

	public void setMentionedIn(Set<Tweet> mentionedIn) {
		this.mentionedIn = mentionedIn;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UserAccount other = (UserAccount) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}
