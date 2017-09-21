package com.cooksys.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cooksys.entity.UserAccount;


public interface UserRepository extends JpaRepository<UserAccount, Integer>{

	UserAccount findByCredentialsUsernameIgnoreCase(String username);
	
	UserAccount findByCredentialsUsernameIgnoreCaseAndActiveTrue(String username);
	
	Set<UserAccount> findByActiveTrue();
	
	//Finding all active followers, something with join table on user field might work
}
