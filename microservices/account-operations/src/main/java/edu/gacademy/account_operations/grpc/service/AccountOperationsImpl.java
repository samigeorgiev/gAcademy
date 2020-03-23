// TODO add logging

package edu.gacademy.account_operations.grpc.service;

import edu.gacademy.account_operations.entities.Course;
import edu.gacademy.account_operations.entities.Enrollment;
import edu.gacademy.account_operations.entities.User;
import edu.gacademy.account_operations.grpc.ContextEntries;
import edu.gacademy.account_operations.grpc.prototypes.*;
import edu.gacademy.account_operations.repositories.CourseRepository;
import edu.gacademy.account_operations.repositories.UserRepository;
import io.grpc.Status;
import io.grpc.StatusRuntimeException;
import io.grpc.stub.StreamObserver;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class AccountOperationsImpl extends AccountOperationsGrpc.AccountOperationsImplBase {

    private UserRepository userRepository;

    private CourseRepository courseRepository;

    private SessionFactory sessionFactory;

    public AccountOperationsImpl(
            UserRepository userRepository,
            CourseRepository courseRepository,
            SessionFactory sessionFactory
    ) {
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
        this.sessionFactory = sessionFactory;
    }

    @Override
    public void getAccount(GetAccountRequest request, StreamObserver<GetAccountResponse> responseObserver) {
        try {
            startTransaction();
        } catch (StatusRuntimeException e) {
            responseObserver.onError(e);
            return;
        }
        Session session = sessionFactory.getCurrentSession();
        int userId = ContextEntries.USER_ID.get();
        User user = userRepository.getById(userId);
        GetAccountResponse response = GetAccountResponse.newBuilder()
                .setFirstName(user.getFirstName())
                .setLastName(user.getFirstName())
                .setEmail(user.getEmail())
                .setIsTeacher(user.getTeacher() != null)
                .build();
        session.getTransaction().commit();
        session.close();
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void enrollCourse(EnrollCourseRequest request, StreamObserver<EnrollCourseResponse> responseObserver) {
        try {
            startTransaction();
        } catch (StatusRuntimeException e) {
            responseObserver.onError(e);
            return;
        }
        Session session = sessionFactory.getCurrentSession();
        int userId = ContextEntries.USER_ID.get();
        User user = userRepository.getById(userId);
        Course course = courseRepository.getById(request.getCourseId());
        if (course == null) {
            responseObserver.onError(Status.NOT_FOUND
                    .withDescription("Course not found")
                    .asRuntimeException()
            );
            return;
        }
        List<Course> enrolledCourses = userRepository.getCourses(user);
        if (enrolledCourses.contains(course)) {
            responseObserver.onError(Status.ALREADY_EXISTS
                    .withDescription("Course already enrolled")
                    .asRuntimeException()
            );
            return;
        }
        userRepository.enrollCourse(user, course);
        session.getTransaction().commit();
        session.close();
        responseObserver.onNext(EnrollCourseResponse.newBuilder().build());
        responseObserver.onCompleted();
    }

    @Override
    public void getCourses(GetCoursesRequest request, StreamObserver<GetCoursesResponse> responseObserver) {
        try {
            startTransaction();
        } catch (StatusRuntimeException e) {
            responseObserver.onError(e);
            return;
        }
        Session session = sessionFactory.getCurrentSession();
        int userId = ContextEntries.USER_ID.get();
        User user = userRepository.getById(userId);
        List<Course> enrolledCourses = userRepository.getCourses(user);
        List<GetCoursesResponse.Course> enrolledCoursesDTO = new ArrayList<>();
        for (Course course : enrolledCourses) {
            GetCoursesResponse.Course courseDTO = GetCoursesResponse.Course.newBuilder()
                    .setId(course.getId())
                    .setTitle(course.getTitle())
                    .setDescription(course.getDescription())
                    .build();
            enrolledCoursesDTO.add(courseDTO);
        }
        session.getTransaction().commit();
        session.close();
        responseObserver.onNext(
                GetCoursesResponse.newBuilder().addAllCourses(enrolledCoursesDTO).build()
        );
        responseObserver.onCompleted();
    }

    @Override
    public void becomeTeacher(BecomeTeacherRequest request, StreamObserver<BecomeTeacherResponse> responseObserver) {
        try {
            startTransaction();
        } catch (StatusRuntimeException e) {
            responseObserver.onError(e);
            return;
        }
        Session session = sessionFactory.getCurrentSession();
        int userId = ContextEntries.USER_ID.get();
        User user = userRepository.getById(userId);
        if (user.getTeacher() != null) {
            responseObserver.onError(Status.ALREADY_EXISTS
                    .withDescription("User is already a teacher")
                    .asRuntimeException()
            );
            return;
        }
        userRepository.becomeTeacher(user);
        session.getTransaction().commit();
        session.close();
        responseObserver.onNext(BecomeTeacherResponse.newBuilder().build());
        responseObserver.onCompleted();
    }

    private void startTransaction() throws StatusRuntimeException {
        Session session;
        try {
            session = sessionFactory.getCurrentSession();
        } catch (HibernateException e) {
            throw Status.INTERNAL
                    .withDescription("Hibernate error")
                    .withCause(e)
                    .asRuntimeException();
        }
        session.beginTransaction();
    }
}
