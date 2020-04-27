package edu.gacademy.accountoperations.service;

import edu.gacademy.accountoperations.entities.Enrollment;
import edu.gacademy.accountoperations.protocols.*;
import edu.gacademy.accountoperations.entities.Course;
import edu.gacademy.accountoperations.entities.Teacher;
import edu.gacademy.accountoperations.entities.User;
import edu.gacademy.accountoperations.repositories.CourseRepository;
import edu.gacademy.accountoperations.repositories.EnrollmentRepository;
import edu.gacademy.accountoperations.repositories.TeacherRepository;
import io.grpc.Status;
import io.grpc.stub.StreamObserver;
import org.lognet.springboot.grpc.GRpcService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@GRpcService
public class AccountOperationsImpl extends AccountOperationsGrpc.AccountOperationsImplBase {

    private final CourseRepository courseRepository;

    private final TeacherRepository teacherRepository;

    private final EnrollmentRepository enrollmentRepository;

    @Autowired
    public AccountOperationsImpl(
            CourseRepository courseRepository,
            TeacherRepository teacherRepository,
            EnrollmentRepository enrollmentRepository
    ) {
        this.courseRepository = courseRepository;
        this.teacherRepository = teacherRepository;
        this.enrollmentRepository = enrollmentRepository;
    }

    @Override
    public void getAccount(
            GetAccountRequest request,
            StreamObserver<GetAccountResponse> responseObserver
    ) {
        User user = ContextEntries.USER.get();
        GetAccountResponse response = GetAccountResponse.newBuilder()
                .setFirstName(user.getFirstName())
                .setLastName(user.getLastName())
                .setEmail(user.getEmail())
                .setIsTeacher(user.getTeacher() != null)
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

        Optional<Course> courseOptional = courseRepository.findById(request.getCourseId());
        if (courseOptional.isEmpty()) {
            responseObserver.onError(Status.NOT_FOUND
                    .withDescription("Course not found")
                    .asRuntimeException()
            );
            return;
        }
        Course course = courseOptional.get();

        Set<Course> courses = courseRepository.findAllEnrolledByUserAndPaid(user);
        if (courses.stream().anyMatch(c -> c.equals(course))) {
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

        responseObserver.onNext(EnrollCourseResponse.newBuilder().build());
        responseObserver.onCompleted();
    }

    @Override
    @Transactional
    public void getCourses(
            GetCoursesRequest request,
            StreamObserver<GetCoursesResponse> responseObserver
    ) {
        User user = ContextEntries.USER.get();

        Set<Course> courses = courseRepository.findAllEnrolledByUserAndPaid(user);
        List<GetCoursesResponse.Course> coursesDTO = new ArrayList<>();
        for (Course course : courses) {
            String creatorFirstName = course.getCreator().getUser().getFirstName();
            String creatorLastName = course.getCreator().getUser().getLastName();
            GetCoursesResponse.Course courseDTO = GetCoursesResponse.Course.newBuilder()
                    .setId(course.getId())
                    .setTitle(course.getTitle())
                    .setDescription(course.getDescription())
                    .setPrice(course.getPrice())
                    .setCreator(creatorFirstName + " " + creatorLastName)
                    .build();
            coursesDTO.add(courseDTO);
        }

        responseObserver.onNext(GetCoursesResponse.newBuilder().addAllCourses(coursesDTO).build());
        responseObserver.onCompleted();
    }

    @Override
    public void becomeTeacher(
            BecomeTeacherRequest request,
            StreamObserver<BecomeTeacherResponse> responseObserver
    ) {
        User user = ContextEntries.USER.get();

        if (user.getTeacher() != null) {
            responseObserver.onError(Status.ALREADY_EXISTS
                    .withDescription("User is already a teacher")
                    .asRuntimeException()
            );
            return;
        }
        Teacher teacher = new Teacher();
        teacher.setUser(user);
        teacherRepository.save(teacher);

        responseObserver.onNext(BecomeTeacherResponse.newBuilder().build());
        responseObserver.onCompleted();
    }
}
