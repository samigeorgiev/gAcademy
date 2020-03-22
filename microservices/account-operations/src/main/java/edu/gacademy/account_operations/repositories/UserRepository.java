package edu.gacademy.account_operations.repositories;

import edu.gacademy.account_operations.entities.Teacher;
import edu.gacademy.account_operations.entities.User;

public interface UserRepository {

    User getById(int id);

    void becomeTeacher(User user);
}
