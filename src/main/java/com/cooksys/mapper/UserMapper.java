package com.cooksys.mapper;

import java.util.List;
import java.util.Set;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.cooksys.dto.UserAccountDto;
import com.cooksys.entity.UserAccount;

@Mapper(componentModel="spring")
public interface UserMapper {

	Set<UserAccount> toSetFromList(List<UserAccount> users);
	
	UserAccount fromDto(UserAccountDto userAccountDto);
	
	@Mapping(target = "username", source = "credentials.username")
	UserAccountDto toDto(UserAccount userAccount);
	
	Set<UserAccount> fromDtoSet(Set<UserAccountDto> userAccountDtos);
	
	Set<UserAccountDto> toDtoSet(Set<UserAccount> userAccounts);
}
