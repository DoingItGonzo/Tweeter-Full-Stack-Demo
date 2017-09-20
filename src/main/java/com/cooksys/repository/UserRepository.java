package com.cooksys.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cooksys.entity.UserAccount;


public interface UserRepository extends JpaRepository<UserAccount, Integer>{

	UserAccount findByCredentialsUsername(String username);
	
	UserAccount findByCredentialsUsernameAndActiveTrue(String username);
	
	Set<UserAccount> findByActiveTrue();
	
	//Finding all active followers, something with join table on user field might work
}
