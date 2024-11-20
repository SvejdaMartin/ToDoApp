package com.example.ToDoApp.service;

import com.example.ToDoApp.model.Task;
import com.example.ToDoApp.repository.TaskRepository;
import com.example.ToDoApp.model.Priority;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    //Constructor
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }
    // Method for getting All tasks
    public List<Task> getAllTasks(){
        return taskRepository.findAll();
    }
    // Method for getting tasks by priority
    public List<Task> getTaskByPriority(Priority priority){
        return taskRepository.findByPriority(priority);
    }
    // Method for getting tasks by completion
    public List<Task> getTasksByCompletion(boolean completed){
        return taskRepository.findByCompleted(completed);
    }
    // Save task (via Hibernate)
    public Task saveTask(Task task){
        return taskRepository.save(task);
    }
    public void deleteTask(Long id){
        taskRepository.deleteById(id);
    }
    // Method to toggle the task completion
    public Task toggleTaskCompletion(Long taskId) {
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new RuntimeException("Task not found"));
        task.setCompleted(!task.isCompleted());
        return taskRepository.save(task);
    }
}
