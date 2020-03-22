package edu.gacademy.account_operations.repositories;

import edu.gacademy.account_operations.entities.Teacher;
import edu.gacademy.account_operations.entities.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

public class UserRepositoryImpl implements UserRepository {

    private SessionFactory sessionFactory;

    public UserRepositoryImpl(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public User getById(int id) {
        Session session = sessionFactory.getCurrentSession();
        return session.get(User.class, id);
    }

    @Override
    public void becomeTeacher(User user) {
        Teacher teacher = new Teacher();
        teacher.setUser(user);
        user.setTeacher(teacher);
    }
}
