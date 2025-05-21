package com.example.task.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.task.models.Task;
import com.example.task.services.TaskService;
import com.example.task.utils.Status;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@RestController
@RequestMapping("/api/task")
@OpenAPIDefinition(info = @Info(title = "TaskController API", description = "TaskController API endpoints Information"))
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping("/addTask")
    public ResponseEntity<String> addTask(@RequestBody Task task) {
        String response = taskService.addTask(task);
        return new ResponseEntity<>(response,HttpStatus.CREATED);
    }

    @GetMapping("/getAllTasks/{userId}")
    public ResponseEntity<List<Task>> getAllTasks(@PathVariable UUID userId) {
        List<Task> tasks = taskService.getAllTasks(userId);
        return new ResponseEntity<>(tasks,HttpStatus.OK);
    }

    @GetMapping("/getTaskById/{userId}/{taskId}")
    public ResponseEntity<Task> getTaskById(@PathVariable UUID userId,@PathVariable UUID taskId) {
        Task task = taskService.getTaskById(userId,taskId);
        return new ResponseEntity<>(task,HttpStatus.OK);
    }

    @GetMapping("/getTasksByStatus/{userId}/{status}")
    public ResponseEntity<List<Task>> getTasksByStatus(@PathVariable UUID userId,@PathVariable Status status) {
        List<Task> tasks = taskService.getTasksByStatus(userId,status);
        return new ResponseEntity<>(tasks,HttpStatus.OK);
    }

    @PutMapping("/updateTask/{userId}/{taskId}")
    public ResponseEntity<String> updateTask(@PathVariable UUID userId,@PathVariable UUID taskId,@RequestBody Task task) {
        String response = taskService.updateTask(userId,taskId,task);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @PutMapping("/updateTaskStatus/{userId}/{taskId}/{status}")
    public ResponseEntity<String> updateTaskStatus(@PathVariable UUID userId,@PathVariable UUID taskId,@PathVariable Status status) {
        String response = taskService.updateTaskStatus(userId,taskId,status);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @DeleteMapping("/deleteTask/{userId}/{taskId}")
    public ResponseEntity<String> deleteTask(@PathVariable UUID userId,@PathVariable UUID taskId) {
        String response = taskService.deleteTask(userId,taskId);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
}
