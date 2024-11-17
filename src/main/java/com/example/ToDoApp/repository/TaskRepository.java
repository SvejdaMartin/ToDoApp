package com.example.ToDoApp.repository;
/**
 * Interface for methods which work with database
 */

import com.example.ToDoApp.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.ToDoApp.model.Priority;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByPriority(Priority priority);
    List<Task> findByCompleted(boolean completed);
}
