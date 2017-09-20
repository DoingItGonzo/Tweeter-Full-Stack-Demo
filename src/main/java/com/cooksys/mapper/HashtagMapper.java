package com.cooksys.mapper;

import java.util.List;
import java.util.Set;

import org.mapstruct.Mapper;

import com.cooksys.dto.HashtagDto;
import com.cooksys.entity.Hashtag;

@Mapper(componentModel="spring")
public interface HashtagMapper {
	
	Set<Hashtag> toSet(List<Hashtag> hashtags);
	
	HashtagDto toDto(Hashtag hashtag);
	
	Hashtag fromDto(HashtagDto hashtag);
	
	Set<HashtagDto> toDtos(Set<Hashtag> hashtag);
	
	Set<Hashtag> fromDto(Set<HashtagDto> hashtag);

}
