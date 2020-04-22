package edu.gacademy.accountoperations.repositories;

import edu.gacademy.accountoperations.entities.Course;
import edu.gacademy.accountoperations.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface CourseRepository extends JpaRepository<Course, Integer> {

    Set<Course> findAllByUsers(User user);
}
