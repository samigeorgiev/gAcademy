package edu.gacademy.accountoperations.repositories;

import edu.gacademy.accountoperations.entities.Course;
import edu.gacademy.accountoperations.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Set;

public interface CourseRepository extends JpaRepository<Course, Integer> {

    @Query("select c from Course c join c.enrollments e join e.user u where u=:user")
    Set<Course> findAllByUser(@Param("user") User user);
}
