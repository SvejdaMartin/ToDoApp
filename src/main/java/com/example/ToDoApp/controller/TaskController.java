package com.example.ToDoApp.controller;

import com.example.ToDoApp.model.Priority;
import com.example.ToDoApp.model.Task;
import com.example.ToDoApp.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService){
        this.taskService = taskService;
    }

    @GetMapping
    public List<Task> getAllTasks(){
        return taskService.getAllTasks();
    }

    @GetMapping("/priority/{priority}")
    public List<Task> getTasksByPriority(@PathVariable Priority priority){
        return taskService.getTaskByPriority(priority);
    }

    @GetMapping("/completed/{completed}")
    public List<Task> getTasksByCompletion(@PathVariable boolean completed){
        return taskService.getTasksByCompletion(completed);
    }
    @PostMapping
    public Task createTask(@RequestBody Task task){
        return taskService.saveTask(task);
    }
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id){
        taskService.deleteTask(id);
    }
    // Endpoint to toggle task completion
    @PatchMapping("/{id}/toggle")
    public Task toggleTaskCompletion(@PathVariable Long id) {
        return taskService.toggleTaskCompletion(id);
    }
}
