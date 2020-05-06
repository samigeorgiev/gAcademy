package edu.gacademy.contentmanagement.services;

import edu.gacademy.contentmanagement.entities.Course;
import edu.gacademy.contentmanagement.entities.Enrollment;
import edu.gacademy.contentmanagement.entities.User;
import edu.gacademy.contentmanagement.protocols.*;
import edu.gacademy.contentmanagement.repositories.CourseRepository;
import edu.gacademy.contentmanagement.repositories.EnrollmentRepository;
import io.grpc.Status;
import io.grpc.stub.StreamObserver;
import org.lognet.springboot.grpc.GRpcService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@GRpcService
public class EnrollmentManagementService extends EnrollmentManagementGrpc.EnrollmentManagementImplBase {

    private final CourseRepository courseRepository;

    private final EnrollmentRepository enrollmentRepository;

    @Autowired
    public EnrollmentManagementService(
            CourseRepository courseRepository,
            EnrollmentRepository enrollmentRepository
    ) {
        this.courseRepository = courseRepository;
        this.enrollmentRepository = enrollmentRepository;
    }

    @Override
    public void getEnrolledCourses(
            GetEnrolledCoursesRequest request,
            StreamObserver<GetEnrolledCoursesResponse> responseObserver
    ) {
        User user = ContextEntries.USER.get();
        if (user == null) {
            responseObserver.onError(ContextEntries.AUTHENTICATION_ERROR.get());
            return;
        }

        Set<Course> enrolledCourses = courseRepository.findAllEnrolledByUserAndPaid(user);
        Set<edu.gacademy.contentmanagement.protocols.Course> enrolledCoursesDto = enrolledCourses
                .stream()
                .map(Course::toCourseDto)
                .collect(Collectors.toSet());
        GetEnrolledCoursesResponse response = GetEnrolledCoursesResponse
                .newBuilder()
                .addAllEnrolledCourses(enrolledCoursesDto)
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void enrollCourse(
            EnrollCourseRequest request,
            StreamObserver<EnrollCourseResponse> responseObserver
    ) {
        User user = ContextEntries.USER.get();
        if (user == null) {
            responseObserver.onError(ContextEntries.AUTHENTICATION_ERROR.get());
            return;
        }

        Optional<Course> courseOptional = courseRepository.findById(request.getCourseId());
        if (courseOptional.isEmpty()) {
            responseObserver.onError(Status.NOT_FOUND
                    .withDescription("Course not found")
                    .asRuntimeException()
            );
            return;
        }
        Course course = courseOptional.get();

        Set<Course> enrolledCourses = courseRepository.findAllEnrolledByUserAndPaid(user);
        if (enrolledCourses.stream().anyMatch(c -> c.equals(course))) {
            responseObserver.onError(Status.ALREADY_EXISTS
                    .withDescription("Course already enrolled")
                    .asRuntimeException()
            );
            return;
        }

        Enrollment enrollment = new Enrollment();
        enrollment.setUser(user);
        enrollment.setCourse(course);
        enrollmentRepository.save(enrollment);

        EnrollCourseResponse response = EnrollCourseResponse
                .newBuilder()
                .setEnrollmentId(enrollment.getId())
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }
}
