package edu.gacademy.contentmanagement.repositories;

import edu.gacademy.contentmanagement.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
