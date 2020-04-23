package edu.gacademy.accountoperations.repositories;

import edu.gacademy.accountoperations.entities.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {
}
