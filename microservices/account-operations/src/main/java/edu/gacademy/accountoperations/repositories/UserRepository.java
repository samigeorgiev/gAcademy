package edu.gacademy.accountoperations.repositories;

import edu.gacademy.accountoperations.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
