package com.cooksys.service;

import java.sql.Timestamp;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Queue;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;

import com.cooksys.dto.ContentCredentialDto;
import com.cooksys.dto.ContextDto;
import com.cooksys.dto.HashtagDto;
import com.cooksys.dto.ReplyTweetDto;
import com.cooksys.dto.RepostTweetDto;
import com.cooksys.dto.SimpleTweetDto;
import com.cooksys.dto.TweetDto;
import com.cooksys.dto.UserAccountDto;
import com.cooksys.entity.Credentials;
import com.cooksys.entity.Hashtag;
import com.cooksys.entity.ReplyTweet;
import com.cooksys.entity.RepostTweet;
import com.cooksys.entity.SimpleTweet;
import com.cooksys.entity.Tweet;
import com.cooksys.entity.UserAccount;
import com.cooksys.mapper.HashtagMapper;
import com.cooksys.mapper.TweetMapper;
import com.cooksys.mapper.UserMapper;
import com.cooksys.repository.HashtagRepository;
import com.cooksys.repository.TweetRepoistory;
import com.cooksys.repository.UserRepository;

@Service
public class TweetService {

	private TweetRepoistory tweetRepository;
	private TweetMapper tweetMapper;
	private UserRepository userRepository;
	private UserMapper userMapper;
	private HashtagRepository hashtagRepository;
	private HashtagMapper hashtagMapper;

	public TweetService(TweetRepoistory tweetRepoistory, TweetMapper tweetMapper, 
			UserRepository userRepository, UserMapper userMapper, 
			HashtagRepository hashtagRepository, HashtagMapper hashtagMapper)
	{
		this.tweetRepository = tweetRepoistory;
		this.tweetMapper = tweetMapper;
		this.userRepository = userRepository;
		this.userMapper = userMapper;
		this.hashtagRepository = hashtagRepository;
		this.hashtagMapper = hashtagMapper;
	}
	
	public List<TweetDto> getTweets() {
		return tweetMapper.toDtos(tweetRepository.findByActiveTrueOrderByPostedDesc());
	}

	public SimpleTweetDto createTweet(ContentCredentialDto contentCredentialDto) {
		UserAccount userAccount = userRepository.findByCredentialsUsernameIgnoreCaseAndActiveTrue(contentCredentialDto.getCredentials().getUsername());
		
		// Allow user to create tweet only if they have correct password
		if (userAccount == null || 
				contentCredentialDto.getCredentials().getPassword() == null || 
				!contentCredentialDto.getCredentials().getPassword().equals(userAccount.getCredentials().getPassword()))
		{
			return null;
		}
		else
		{
			SimpleTweet tweet = new SimpleTweet();
			tweet.setAuthor(userAccount);
			tweet.setPosted(new Timestamp(System.currentTimeMillis()));
			tweet.setContent(contentCredentialDto.getContent());
			tweet.setActive(true);
	        tweet.setMentions(extractMentions(tweet.getContent()));
	        tweet.setHashtagsUsed(extractHashtags(tweet.getContent(), tweet.getPosted()));
			tweetRepository.save(tweet);
			return tweetMapper.toDtoSimple(tweet);
		}
	}

	public TweetDto getTweet(Integer id) {
		return tweetMapper.toDto(tweetRepository.findByIdAndActiveTrue(id));
	}

	public TweetDto deleteTweet(Integer id, Credentials credentials) {
		Tweet tweet = tweetRepository.findByIdAndActiveTrue(id);
		
		// Allow user to delete tweet only if they match author credentials
		if (tweet == null ||
				credentials.getPassword() == null || credentials.getUsername() == null ||
				!credentials.getPassword().equals(tweet.getAuthor().getCredentials().getPassword()) || 
				!credentials.getUsername().equals(tweet.getAuthor().getCredentials().getUsername()))
		{
			return null;
		} 
		else
		{
			TweetDto tweetDto = tweetMapper.toDto(tweet);
			tweet.setActive(false);
			tweetRepository.save(tweet);
			return tweetDto;
		}
	}

	public RepostTweetDto repostTweet(Integer id, Credentials credentials) {
		UserAccount userAccount = userRepository.findByCredentialsUsernameIgnoreCaseAndActiveTrue(credentials.getUsername());
		
		Tweet tweetToRepost = tweetRepository.findByIdAndActiveTrue(id);
		
		// Allow user to repost tweet only if they have the correct password and tweet isnt deleted
		if (userAccount == null || tweetToRepost == null ||
				credentials.getPassword() == null || 
				!credentials.getPassword().equals(userAccount.getCredentials().getPassword()))
		{
			return null;
		}
		else
		{
			RepostTweet tweet = new RepostTweet();
			tweet.setAuthor(userAccount);
			tweet.setPosted(new Timestamp(System.currentTimeMillis()));
			tweet.setRepostOf(tweetToRepost);
			tweet.setActive(true);
			tweetRepository.save(tweet);
			return tweetMapper.toDtoRepost(tweet);
		}
	}

	public ReplyTweetDto replyTweet(Integer id, ContentCredentialDto contentCredentials) {
		UserAccount userAccount = userRepository.findByCredentialsUsernameIgnoreCaseAndActiveTrue(contentCredentials.getCredentials().getUsername());
		
		Tweet tweetToReply = tweetRepository.findByIdAndActiveTrue(id);
		
		// Allow user to repost tweet only if they have the correct password and tweet isnt deleted
		if (userAccount == null || tweetToReply == null ||
				contentCredentials.getCredentials().getPassword() == null || 
				!contentCredentials.getCredentials().getPassword().equals(userAccount.getCredentials().getPassword()))
		{
			return null;
		}
		else
		{
			ReplyTweet tweet = new ReplyTweet();
			tweet.setAuthor(userAccount);
			tweet.setPosted(new Timestamp(System.currentTimeMillis()));
			tweet.setContent(contentCredentials.getContent());
			tweet.setInReplyTo(tweetToReply);
			tweet.setActive(true);
			tweet.setMentions(extractMentions(tweet.getContent()));
			tweet.setHashtagsUsed(extractHashtags(tweet.getContent(), tweet.getPosted()));
			tweetRepository.save(tweet);
			return tweetMapper.toDtoReply(tweet);
		}
	}

	public boolean likeTweet(Integer id, Credentials credentials) {
		UserAccount userAccount = userRepository.findByCredentialsUsernameIgnoreCaseAndActiveTrue(credentials.getUsername());
		
		Tweet tweetToLike = tweetRepository.findByIdAndActiveTrue(id);
		
		// Allow user to repost tweet only if they have the correct password and tweet isnt deleted
		if (userAccount == null || tweetToLike == null ||
				credentials.getPassword() == null || 
				!credentials.getPassword().equals(userAccount.getCredentials().getPassword()))
		{
			return false;
		}
		else
		{
			tweetToLike.getUsersWhoLikeTweet().add(userAccount);
			tweetRepository.save(tweetToLike);
			return true;
		}
	}

	public Set<UserAccountDto> getUsersWhoLiked(Integer id) {
		Tweet tweetLiked = tweetRepository.findByIdAndActiveTrue(id);
		
		if (tweetLiked == null)
		{
			return null;
		}
		else
		{
			return userMapper.toDtoSet(tweetLiked.getUsersWhoLikeTweet());
		}
	}

	public Set<RepostTweetDto> getDirectReposts(Integer id) {
		Tweet tweet = tweetRepository.findByIdAndActiveTrue(id);

		if (tweet == null)
		{
			return null;
		}
		
		Set<RepostTweetDto> repostTweetDtos = new HashSet<RepostTweetDto>();
		
		for (RepostTweet repost : tweetRepository.findAllByRepostOfId(tweet.getId()))
		{
			if (repost.isActive())
			{
				repostTweetDtos.add(tweetMapper.toDtoRepost(repost));
			}
		}
		
		return repostTweetDtos;
		
		
	}

	public Set<ReplyTweetDto> getDirectReplies(Integer id) {
		Tweet tweet = tweetRepository.findByIdAndActiveTrue(id);

		if (tweet == null)
		{
			return null;
		}
		
		Set<ReplyTweetDto> replyTweetDtos = new HashSet<ReplyTweetDto>();
		
		for (ReplyTweet reply : tweetRepository.findAllByInReplyToId(tweet.getId()))
		{
			if (reply.isActive())
			{
				replyTweetDtos.add(tweetMapper.toDtoReply(reply));
			}
		}
		
		return replyTweetDtos;
	}

	public Set<UserAccountDto> getMentionedUsers(Integer id) {
		Tweet tweet = tweetRepository.findByIdAndActiveTrue(id);

		if (tweet == null)
		{
			return null;
		}
		
		Set<UserAccountDto> mentionedUsersDtos = new HashSet<UserAccountDto>();
		
		for (UserAccount mentioned : tweet.getMentions())
		{
			if (mentioned.isActive())
			{
				mentionedUsersDtos.add(userMapper.toDto(mentioned));
			}
		}
		
		return mentionedUsersDtos;
	}
	
	public Set<HashtagDto> getTagsInTweet(Integer id) {
		Tweet tweet = tweetRepository.findByIdAndActiveTrue(id);
		
		if (tweet == null)
		{
			return null;
		}
		
		return hashtagMapper.toDtos(tweet.getHashtagsUsed());
		
	}
	
	public ContextDto getContext(Integer id) {
		Tweet targetTweet = tweetRepository.findByIdAndActiveTrue(id);
		
		if (targetTweet == null)
		{
			return null;
		}
		
		
		ContextDto contextDto = new ContextDto();
		
		List<TweetDto> before = new ArrayList<TweetDto>();
		//If the tweet is not a replyTweet there is no chain before
		if (targetTweet instanceof ReplyTweet)
		{
			contextDto.setTarget(tweetMapper.replyToSimpleDto((ReplyTweet) targetTweet));
			Tweet currentBeforeTweet = tweetRepository.findOne(((ReplyTweet) targetTweet).getInReplyTo().getId());
			
			// Keep going up the chain until we hit a non-replyTweet
			while (currentBeforeTweet instanceof ReplyTweet) {
				System.out.println(currentBeforeTweet.getId());
				if (currentBeforeTweet.isActive())
				{
					before.add(tweetMapper.replyToSimpleDto((ReplyTweet) currentBeforeTweet));
				}
				currentBeforeTweet = tweetRepository.findOne(((ReplyTweet) currentBeforeTweet).getInReplyTo().getId());
			} 
			
			before.add(tweetMapper.toDto(currentBeforeTweet));
			
			// Sort chronologically
			Collections.sort(before, new Comparator<TweetDto>() {
				@Override
				public int compare(TweetDto o1, TweetDto o2) {
					return o1.getPosted().compareTo(o2.getPosted());
				}
			});
		}
		else
		{
			contextDto.setTarget(tweetMapper.toDto(targetTweet));
		}
		
		contextDto.setBefore(before);
		
		List<TweetDto> after = new ArrayList<TweetDto>();
		
		Queue<Tweet> tweetRepliesToSearch = new ArrayDeque<Tweet>();
		
		Tweet currentAfterTweet;
		
		tweetRepliesToSearch.add(targetTweet);
			
		// Do a breadth search through the tree of replies
		while(!tweetRepliesToSearch.isEmpty())
		{
			currentAfterTweet = tweetRepliesToSearch.poll();
			for (Tweet reply : tweetRepository.findAllByInReplyToId(currentAfterTweet.getId()))
			{
				if (reply.isActive())
				{
					if (reply instanceof ReplyTweet)
					{
						after.add(tweetMapper.replyToSimpleDto((ReplyTweet) reply));
					}
					else
					{
						after.add(tweetMapper.toDto(reply));
					}
				}
				tweetRepliesToSearch.add(reply);
			}
			
		} 
		
		Collections.sort(after, new Comparator<TweetDto>() {
			@Override
			public int compare(TweetDto o1, TweetDto o2) {
				return o1.getPosted().compareTo(o2.getPosted());
			}
		});
		
		contextDto.setAfter(after);
		
		return contextDto;
	}
	
	private Set<UserAccount> extractMentions(String content)
	{
		Pattern mentionPattern = Pattern.compile("@(\\S)+");
        Matcher mentionMatcher = mentionPattern.matcher(content);
        Set<UserAccount> peopleMentioned = new HashSet<UserAccount>();
        while (mentionMatcher.find())
        {
        	UserAccount mentionedUser = userRepository.findByCredentialsUsernameIgnoreCase(mentionMatcher.group().substring(1));
        	if (mentionedUser != null)
        	{
        		peopleMentioned.add(mentionedUser);
        	}
        }
        return peopleMentioned;
	}
	
	private Set<Hashtag> extractHashtags(String content, Timestamp timeUsed)
	{
		Pattern p = Pattern.compile("#(\\S)+");
		Matcher m = p.matcher(content);
		Set<Hashtag> hashtags = new HashSet<Hashtag>();
		while(m.find())
		{
			Hashtag hashtag = hashtagRepository.findByLabelIgnoreCase(m.group().substring(1));
			// Hashtag has not been seen before so we need to create it
			if (hashtag == null)
			{
				hashtag = new Hashtag();
				hashtag.setLabel(m.group().substring(1));
				hashtag.setFirstUsed(timeUsed);
			}
			hashtag.setLastUsed(timeUsed);
			hashtagRepository.save(hashtag);
			hashtags.add(hashtag);
		}
		
		return hashtags;
	}

	

	

}
