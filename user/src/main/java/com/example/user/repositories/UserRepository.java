package com.example.user.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.user.models.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByUserNameAndPassword(String userName,String password);
    Optional<User> findByUserName(String userName);
}
