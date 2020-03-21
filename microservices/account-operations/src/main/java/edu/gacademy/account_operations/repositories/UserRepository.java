package edu.gacademy.account_operations.repositories;

import edu.gacademy.account_operations.entities.User;

public interface UserRepository {

    User getUserById(int id);
}
