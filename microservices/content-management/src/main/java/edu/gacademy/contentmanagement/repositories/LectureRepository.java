package edu.gacademy.contentmanagement.repositories;

import edu.gacademy.contentmanagement.entities.Course;
import edu.gacademy.contentmanagement.entities.Lecture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LectureRepository extends JpaRepository<Lecture, Integer> {

    int countAllByCourse(Course course);
}
