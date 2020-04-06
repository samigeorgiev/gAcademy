package edu.gacademy.account_operations;

import edu.gacademy.account_operations.entities.Course;
import edu.gacademy.account_operations.entities.Enrollment;
import edu.gacademy.account_operations.entities.Teacher;
import edu.gacademy.account_operations.entities.User;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateConfig {

    public static SessionFactory createSessionFactory() {
        Configuration configuration = new Configuration()
                .setProperty("hibernate.connection.url", System.getenv("DB_URL"))
                .setProperty("hibernate.connection.username", System.getenv("DB_USERNAME"))
                .setProperty("hibernate.connection.password", System.getenv("DB_PASSWORD"));
        return configuration.configure()
                .addAnnotatedClass(User.class)
                .addAnnotatedClass(Teacher.class)
                .addAnnotatedClass(Course.class)
                .addAnnotatedClass(Enrollment.class)
                .buildSessionFactory();
    }
}
