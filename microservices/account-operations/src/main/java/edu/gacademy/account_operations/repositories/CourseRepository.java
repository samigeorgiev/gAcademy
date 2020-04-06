package edu.gacademy.account_operations.repositories;

import edu.gacademy.account_operations.entities.Course;

public interface CourseRepository {

    Course getById(int id);
}
