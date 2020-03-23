package edu.gacademy.account_operations.repositories;

import edu.gacademy.account_operations.entities.Course;
import edu.gacademy.account_operations.entities.User;

import java.util.List;

public interface UserRepository {

    User getById(int id);

    void becomeTeacher(User user);

    void enrollCourse(User user, Course course);

    List<Course> getCourses(User user);
}
