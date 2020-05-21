package edu.gacademy.contentmanagement.services;

import edu.gacademy.contentmanagement.entities.Category;
import edu.gacademy.contentmanagement.entities.Course;
import edu.gacademy.contentmanagement.entities.Teacher;
import edu.gacademy.contentmanagement.entities.User;
import edu.gacademy.contentmanagement.protocols.*;
import edu.gacademy.contentmanagement.repositories.CategoryRepository;
import edu.gacademy.contentmanagement.repositories.CourseRepository;
import io.grpc.Status;
import io.grpc.StatusRuntimeException;
import io.grpc.stub.StreamObserver;
import org.lognet.springboot.grpc.GRpcService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@GRpcService
public class CourseManagementService extends CourseManagementGrpc.CourseManagementImplBase {

    private final CategoryRepository categoryRepository;

    private final CourseRepository courseRepository;

    @Autowired
    public CourseManagementService(
            CategoryRepository categoryRepository,
            CourseRepository courseRepository
    ) {
        this.categoryRepository = categoryRepository;
        this.courseRepository = courseRepository;
    }

    @Override
    public void getCourse(
            GetCourseRequest request,
            StreamObserver<GetCourseResponse> responseObserver
    ) {
        int courseId = request.getId();
        Optional<Course> courseOptional = courseRepository.findById(courseId);
        if (courseOptional.isEmpty()) {
            responseObserver.onError(Status.NOT_FOUND
                    .withDescription("Course not found")
                    .asRuntimeException()
            );
            return;
        }
        Course course = courseOptional.get();

        GetCourseResponse response = GetCourseResponse.newBuilder()
                .setCourse(course.toCourseDto()).build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    @Transactional
    public void createCourse(
            CreateCourseRequest request,
            StreamObserver<CreateCourseResponse> responseObserver
    ) {
        Teacher teacher;
        try {
            teacher = getTeacherFromContext();
        } catch (StatusRuntimeException e) {
            responseObserver.onError(e);
            return;
        }

        CreatedCourse createdCourseDto = request.getCreatedCourse();
        if (
            createdCourseDto.getTitle().equals("") ||
            createdCourseDto.getDescription().equals("") ||
            createdCourseDto.getPrice() == 0 ||
            createdCourseDto.getCategoriesIdsList().size() == 0
        ) {
            responseObserver.onError(Status.INVALID_ARGUMENT
                .withDescription("Course information is incomplete")
                .asRuntimeException()
            );
            return;
        }

        Course createdCourse = new Course(
                createdCourseDto.getTitle(),
                createdCourseDto.getDescription(),
                createdCourseDto.getPrice()
        );

        List<Integer> categoriesIds = request.getCreatedCourse().getCategoriesIdsList();
        List<Category> categories = categoryRepository.findAllById(categoriesIds);
        createdCourse.setCreator(teacher);
        createdCourse.setCategories(new HashSet<>(categories));
        courseRepository.save(createdCourse);

        responseObserver.onNext(CreateCourseResponse.newBuilder().build());
        responseObserver.onCompleted();
    }

    @Override
    @Transactional
    public void getCreatedCourses(
            GetCreatedCoursesRequest request,
            StreamObserver<GetCreatedCoursesResponse> responseObserver
    ) {
        Teacher teacher;
        try {
            teacher = getTeacherFromContext();
        } catch (StatusRuntimeException e) {
            responseObserver.onError(e);
            return;
        }

        Set<Course> createdCourses = courseRepository.findAllIncludingCategoriesByCreator(teacher);
        Set<CreatedCourse> createdCoursesDto = createdCourses
                .stream()
                .map(Course::toCreatedCourseDto)
                .collect(Collectors.toSet());
        GetCreatedCoursesResponse response = GetCreatedCoursesResponse
                .newBuilder()
                .addAllCreatedCourses(createdCoursesDto)
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void updateCourse(
            UpdateCourseRequest request,
            StreamObserver<UpdateCourseResponse> responseObserver
    ) {
        super.updateCourse(request, responseObserver);
    }

    @Override
    public void deleteCourse(
            DeleteCourseRequest request,
            StreamObserver<DeleteCourseResponse> responseObserver
    ) {
        Teacher teacher;
        try {
            teacher = getTeacherFromContext();
        } catch (StatusRuntimeException e) {
            responseObserver.onError(e);
            return;
        }

        Optional<Course> courseOptional = courseRepository.findById(request.getId());
        if (courseOptional.isEmpty()) {
            responseObserver.onError(Status.NOT_FOUND
                    .withDescription("Course not found")
                    .asRuntimeException()
            );
            return;
        }
        Course course = courseOptional.get();

        if (!course.getCreator().equals(teacher)) {
            responseObserver.onError(Status.PERMISSION_DENIED
                    .withDescription("Not owner of the course")
                    .asRuntimeException()
            );
            return;
        }

        courseRepository.delete(course);

        responseObserver.onNext(DeleteCourseResponse.newBuilder().build());
        responseObserver.onCompleted();
    }

    @Override
    @Transactional
    public void getCoursesByCategory(
        GetCoursesByCategoryRequest request,
        StreamObserver<GetCoursesByCategoryResponse> responseObserver
    ) {
        int categoryId = request.getCategoryId();
        Optional<Category> categoryOptional = categoryRepository.findById(categoryId);
        if (categoryOptional.isEmpty()) {
            responseObserver.onError(Status.NOT_FOUND
                .withDescription("Category not found")
                .asRuntimeException()
            );
            return;
        }
        Category category = categoryOptional.get();

        Set<Course> courses = category.getCourses();
        GetCoursesByCategoryResponse response = GetCoursesByCategoryResponse
            .newBuilder()
            .addAllCourses(
                courses.stream().map(Course::toCourseDto).collect(Collectors.toList())
            )
            .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void getCoursesByPattern(
        GetCoursesByPatternRequest request,
        StreamObserver<GetCoursesByPatternResponse> responseObserver
    ) {
        String pattern = request.getPattern();
        Set<Course> courses = courseRepository.findAllByTitleContainingIgnoreCase(pattern);

        GetCoursesByPatternResponse response = GetCoursesByPatternResponse
            .newBuilder()
            .addAllCourses(
                courses.stream().map(Course::toCourseDto).collect(Collectors.toList())
            )
            .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void getCategories(
            GetCategoriesRequest request,
            StreamObserver<GetCategoriesResponse> responseObserver
    ) {
        List<Category> categories = categoryRepository.findAll();
        List<GetCategoriesResponse.Category> categoriesDto = categories.stream().map(category ->
            GetCategoriesResponse.Category.newBuilder()
                    .setId(category.getId())
                    .setName(category.getName())
                    .build()
        ).collect(Collectors.toList());
        GetCategoriesResponse response = GetCategoriesResponse.newBuilder()
                .addAllCategories(categoriesDto)
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    private Teacher getTeacherFromContext() {
        User user = ContextEntries.USER.get();
        if (user == null) {
            throw ContextEntries.AUTHENTICATION_ERROR.get();
        }
        Teacher teacher = user.getTeacher();
        if (teacher == null) {
            throw Status.PERMISSION_DENIED.withDescription("Not a teacher").asRuntimeException();
        }
        return teacher;
    }
}
