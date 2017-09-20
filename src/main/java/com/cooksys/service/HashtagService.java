package com.cooksys.service;

import java.util.Set;

import org.springframework.stereotype.Service;

import com.cooksys.dto.HashtagDto;
import com.cooksys.mapper.HashtagMapper;
import com.cooksys.repository.HashtagRepository;

@Service
public class HashtagService {

	private HashtagRepository hashtagRepository;
	private HashtagMapper hashtagMapper;

	public HashtagService(HashtagRepository hashtagRepository, HashtagMapper hashtagMapper)
	{
		this.hashtagRepository = hashtagRepository;
		this.hashtagMapper = hashtagMapper;
	}
	
	public Set<HashtagDto> getTags() {
		return hashtagMapper.toDtos(hashtagMapper.toSet(hashtagRepository.findAll()));
	}

}
