package com.cooksys.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cooksys.entity.UserAccount;


public interface UserRepository extends JpaRepository<UserAccount, Integer>{

}
