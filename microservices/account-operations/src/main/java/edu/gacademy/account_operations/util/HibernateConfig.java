package edu.gacademy.account_operations.util;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateConfig {

    private static SessionFactory sessionFactory;

    public static SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public static void configSessionFactory() {
        Configuration configuration = new Configuration()
                .setProperty("hibernate.connection.url", System.getenv("DB_URL"))
                .setProperty("hibernate.connection.username", System.getenv("DB_USERNAME"))
                .setProperty("hibernate.connection.password", System.getenv("DB_PASSWORD"));
        sessionFactory = configuration.configure().buildSessionFactory();
    }
}
