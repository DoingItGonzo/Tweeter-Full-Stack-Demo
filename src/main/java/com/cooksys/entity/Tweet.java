package com.cooksys.entity;

import java.sql.Timestamp;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.InheritanceType;

@Entity
@Inheritance(strategy=InheritanceType.SINGLE_TABLE)
public class Tweet {
	
	@Id
	@GeneratedValue
	private Integer id;
	
	@ManyToOne
	@JoinColumn(nullable=false)
	private UserAccount author;
	
	@Column(nullable=false)
	private Timestamp posted;
	
	@ManyToMany
	private Set<UserAccount> mentions;

	@Column(nullable=false)
	private boolean active;
	
	@ManyToMany
	private Set<UserAccount> usersWhoLikeTweet;
	
	@ManyToMany
	private Set<Hashtag> hashtagsUsed;
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public UserAccount getAuthor() {
		return author;
	}

	public void setAuthor(UserAccount author) {
		this.author = author;
	}

	public Timestamp getPosted() {
		return posted;
	}

	public void setPosted(Timestamp posted) {
		this.posted = posted;
	}
	
	public Set<UserAccount> getMentions() {
		return mentions;
	}

	public void setMentions(Set<UserAccount> mentions) {
		this.mentions = mentions;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public Set<UserAccount> getUsersWhoLikeTweet() {
		return usersWhoLikeTweet;
	}

	public void setUsersWhoLikeTweet(Set<UserAccount> usersWhoLikeTweet) {
		this.usersWhoLikeTweet = usersWhoLikeTweet;
	}

	public Set<Hashtag> getHashtagsUsed() {
		return hashtagsUsed;
	}

	public void setHashtagsUsed(Set<Hashtag> hashtagsUsed) {
		this.hashtagsUsed = hashtagsUsed;
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
		Tweet other = (Tweet) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	
	

}
