package com.example.ToDoApp.model;

import jakarta.persistence.*; // A library with annotations and classes for API JPA


@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    private Priority priority;

    private boolean completed;
}
