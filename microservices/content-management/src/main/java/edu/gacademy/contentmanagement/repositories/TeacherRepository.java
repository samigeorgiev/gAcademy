package edu.gacademy.contentmanagement.repositories;

import edu.gacademy.contentmanagement.entities.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository<Teacher, Integer> {
}
