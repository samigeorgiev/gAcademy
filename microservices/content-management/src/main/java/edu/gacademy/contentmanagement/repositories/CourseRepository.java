package edu.gacademy.contentmanagement.repositories;

import edu.gacademy.contentmanagement.entities.Course;
import edu.gacademy.contentmanagement.entities.Teacher;
import edu.gacademy.contentmanagement.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Set;

public interface CourseRepository extends JpaRepository<Course, Integer> {

    Set<Course> findAllByTitleContainingIgnoreCase(String pattern);

    @Query("select course " +
            "from Course course " +
            "join fetch course.categories " +
            "join fetch course.creator creator " +
            "join fetch creator.user user " +
            "where creator = :creator"
    )
    Set<Course> findAllIncludingCategoriesByCreator(@Param("creator") Teacher creator);

    @Query("select course " +
            "from Course course " +
            "join fetch course.creator creator " +
            "join course.enrollments enrollment " +
            "join fetch creator.user creator_user " +
            "join enrollment.user user " +
            "join enrollment.payment payment " +
            "where user = :user and payment is not null"
    )
    Set<Course> findAllEnrolledByUserAndPaid(@Param("user") User user);
}
