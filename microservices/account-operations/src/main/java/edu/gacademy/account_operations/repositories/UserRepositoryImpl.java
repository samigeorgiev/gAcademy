package edu.gacademy.account_operations.repositories;

import edu.gacademy.account_operations.entities.Course;
import edu.gacademy.account_operations.entities.Enrollment;
import edu.gacademy.account_operations.entities.Teacher;
import edu.gacademy.account_operations.entities.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.resource.transaction.spi.TransactionStatus;

import java.util.List;

public class UserRepositoryImpl implements UserRepository {

    private SessionFactory sessionFactory;

    public UserRepositoryImpl(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public User getById(int id) {
        Session session = sessionFactory.getCurrentSession();
        if (session.getTransaction().getStatus() != TransactionStatus.ACTIVE) {
            session.beginTransaction();
        }
        return session.get(User.class, id);
    }

    @Override
    public void becomeTeacher(User user) {
        Teacher teacher = new Teacher();
        teacher.setUser(user);
        user.setTeacher(teacher);
    }

    @Override
    public void enrollCourse(User user, Course course) {
        Session session = sessionFactory.getCurrentSession();
        if (session.getTransaction().getStatus() != TransactionStatus.ACTIVE) {
            session.beginTransaction();
        }
        Enrollment enrollment = new Enrollment();
        enrollment.setUser(user);
        enrollment.setCourse(course);
        List<Enrollment> enrollments = user.getEnrollments();
        enrollments.add(enrollment);
        user.setEnrollments(enrollments);
        session.save(user);
    }
}
