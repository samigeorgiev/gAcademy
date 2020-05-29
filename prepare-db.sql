create table users (
    id serial primary key,
    email varchar not null,
    password varchar not null,
    first_name varchar not null,
    last_name varchar not null
);

create table teachers (
    id serial primary key,
    week_profit numeric(10, 2) default 0,
    user_id integer references users(id) not null
);

create table courses (
    id serial primary key,
    title varchar not null,
    price numeric(5, 2),
    description text not null,
    creator_id integer references teachers(id) not null
);

create table categories (
    id serial primary key,
    name varchar not null
);

create table courses_categories (
    id serial primary key,
    course_id integer references courses(id) not null,
    category_id integer references categories(id) not null
);

create table payments (
    id serial primary key,
    date timestamp default now()
);

create table enrollments (
    id serial primary key,
    course_id integer references courses(id) not null,
    user_id integer references users(id) not null,
    payment_id integer references payments(id)
);

create table resources (
    id serial primary key,
    path varchar
);

create table lectures (
    id serial primary key,
    name varchar not null,
    course_id integer references courses(id) not null,
    resource_id integer references resources(id) not null
);

insert into categories
values (default, 'Math'), (default, 'History'), (default, 'Programming');
