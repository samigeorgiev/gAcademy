package edu.gacademy.contentmanagement.repositories;

import edu.gacademy.contentmanagement.entities.Course;
import edu.gacademy.contentmanagement.entities.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {

    int countAllByCourseAndPaymentIsNotNull(Course course);
}
