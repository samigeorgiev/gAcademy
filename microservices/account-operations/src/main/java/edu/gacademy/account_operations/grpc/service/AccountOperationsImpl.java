// TODO add logging

package edu.gacademy.account_operations.grpc.service;

import edu.gacademy.account_operations.entities.Course;
import edu.gacademy.account_operations.entities.Enrollment;
import edu.gacademy.account_operations.entities.User;
import edu.gacademy.account_operations.grpc.ContextEntries;
import edu.gacademy.account_operations.grpc.protocols.*;
import edu.gacademy.account_operations.repositories.CourseRepository;
import edu.gacademy.account_operations.repositories.UserRepository;
import io.grpc.Status;
import io.grpc.stub.StreamObserver;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class AccountOperationsImpl extends AccountOperationsGrpc.AccountOperationsImplBase {

    private UserRepository userRepository;

    private CourseRepository courseRepository;

    public AccountOperationsImpl(
            UserRepository userRepository,
            CourseRepository courseRepository
    ) {
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
    }

    @Override
    public void getAccount(GetAccountRequest request, StreamObserver<GetAccountResponse> responseObserver) {
        int userId = ContextEntries.USER_ID.get();
        User user = userRepository.getById(userId);
        GetAccountResponse response = GetAccountResponse.newBuilder()
                .setFirstName(user.getFirstName())
                .setLastName(user.getFirstName())
                .setEmail(user.getEmail())
                .setIsTeacher(user.getTeacher() != null)
                .build();
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void enrollCourse(EnrollCourseRequest request, StreamObserver<EnrollCourseResponse> responseObserver) {
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
        List<Course> enrolledCourses = user.getEnrollments().stream()
                .map(Enrollment::getCourse).collect(Collectors.toList());
        if (enrolledCourses.contains(course)) {
            responseObserver.onError(Status.ALREADY_EXISTS
                    .withDescription("Course already enrolled")
                    .asRuntimeException()
            );
            return;
        }
        userRepository.enrollCourse(user, course);
        responseObserver.onNext(EnrollCourseResponse.newBuilder().build());
        responseObserver.onCompleted();
    }

    @Override
    public void getCourses(GetCoursesRequest request, StreamObserver<GetCoursesResponse> responseObserver) {
        int userId = ContextEntries.USER_ID.get();
        User user = userRepository.getById(userId);
        List<Course> enrolledCourses = user.getEnrollments().stream()
                .map(Enrollment::getCourse).collect(Collectors.toList());
        List<GetCoursesResponse.Course> enrolledCoursesDTO = new ArrayList<>();
        for (Course course : enrolledCourses) {
            String creatorFirstName = course.getCreator().getUser().getFirstName();
            String creatorLastName = course.getCreator().getUser().getFirstName();
            GetCoursesResponse.Course courseDTO = GetCoursesResponse.Course.newBuilder()
                    .setId(course.getId())
                    .setTitle(course.getTitle())
                    .setDescription(course.getDescription())
                    .setCreator(creatorFirstName + creatorLastName)
                    .build();
            enrolledCoursesDTO.add(courseDTO);
        }
        responseObserver.onNext(
                GetCoursesResponse.newBuilder().addAllCourses(enrolledCoursesDTO).build()
        );
        responseObserver.onCompleted();
    }

    @Override
    public void becomeTeacher(BecomeTeacherRequest request, StreamObserver<BecomeTeacherResponse> responseObserver) {
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
        responseObserver.onNext(BecomeTeacherResponse.newBuilder().build());
        responseObserver.onCompleted();
    }
}
