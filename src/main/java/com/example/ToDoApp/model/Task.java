package com.example.ToDoApp.model;

import jakarta.persistence.*; // A library with annotations and classes for API JPA


@Entity   // Define this class as an entity which will be display in database table
public class Task {

    @Id // primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Genereate ID
    private Long id;

    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    private Priority priority;

    private boolean completed;

    // Getters a setters

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
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
    public Priority getPriority() {
        return priority;
    }
    public void setPriority(Priority priority) {
        this.priority = priority;
    }
    public boolean isCompleted() {
        return completed;
    }
    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
