create database burgers_db;

use burgers_db;

create table burgers
(
    id INTEGER
    auto_increment not null,
    burger_name VARCHAR
    (60),
    devoured boolean,
    primary key
    (id)
);