package edu.gacademy.contentmanagement.entities;

import edu.gacademy.contentmanagement.protocols.CreatedCourse;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private double price;

    @ManyToOne
    @JoinColumn(name = "creator_id")
    private Teacher creator;

    @ManyToMany
    @JoinTable(
            name = "courses_categories",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<Category> categories;

    @OneToMany(mappedBy = "course", cascade = CascadeType.REMOVE)
    private Set<Enrollment> enrollments;

    public Course() {
    }

    public Course(String title, String description, double price) {
        this.title = title;
        this.description = description;
        this.price = price;
    }

    public edu.gacademy.contentmanagement.protocols.Course toCourseDto() {
        edu.gacademy.contentmanagement.protocols.Course.Builder dtoBuilder =
                edu.gacademy.contentmanagement.protocols.Course.newBuilder();
        String creatorFirstName = creator.getUser().getFirstName();
        String creatorLastName = creator.getUser().getLastName();
        dtoBuilder
                .setId(id)
                .setTitle(title)
                .setDescription(description)
                .setPrice(price)
                .setCreator(creatorFirstName + " " + creatorLastName);
        return dtoBuilder.build();
    }

    public CreatedCourse toCreatedCourseDto() {
        CreatedCourse.Builder dtoBuilder = CreatedCourse.newBuilder();
        Set<Integer> categoriesIds =
                categories.stream().map(Category::getId).collect(Collectors.toSet());
        dtoBuilder
                .setId(id)
                .setTitle(title)
                .setDescription(description)
                .setPrice(price)
                .addAllCategoriesIds(categoriesIds);
        return dtoBuilder.build();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Teacher getCreator() {
        return creator;
    }

    public void setCreator(Teacher creator) {
        this.creator = creator;
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }

    public Set<Enrollment> getEnrollments() {
        return enrollments;
    }

    public void setEnrollments(Set<Enrollment> enrolledUser) {
        this.enrollments = enrolledUser;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Course course = (Course) o;

        return id == course.id;
    }

    @Override
    public int hashCode() {
        return id;
    }
}
