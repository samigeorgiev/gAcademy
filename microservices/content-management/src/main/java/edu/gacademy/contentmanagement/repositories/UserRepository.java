package edu.gacademy.contentmanagement.repositories;

import edu.gacademy.contentmanagement.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
