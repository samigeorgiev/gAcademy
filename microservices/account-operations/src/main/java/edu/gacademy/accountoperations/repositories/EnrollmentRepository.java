package edu.gacademy.accountoperations.repositories;

import edu.gacademy.accountoperations.entities.Enrollment;
import edu.gacademy.accountoperations.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {

    List<Enrollment> findAllByUser(User user);
}
