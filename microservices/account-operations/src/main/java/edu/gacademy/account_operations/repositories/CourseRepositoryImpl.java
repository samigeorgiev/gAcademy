package edu.gacademy.account_operations.repositories;

import edu.gacademy.account_operations.entities.Course;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.resource.transaction.spi.TransactionStatus;

public class CourseRepositoryImpl implements CourseRepository {

    private SessionFactory sessionFactory;

    public CourseRepositoryImpl(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public Course getById(int id) {
        Session session = sessionFactory.getCurrentSession();
        if (session.getTransaction().getStatus() != TransactionStatus.ACTIVE) {
            session.beginTransaction();
        }
        return session.get(Course.class, id);
    }
}
