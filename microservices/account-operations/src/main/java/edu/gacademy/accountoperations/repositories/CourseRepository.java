package edu.gacademy.accountoperations.repositories;

import edu.gacademy.accountoperations.entities.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Integer> {
}
