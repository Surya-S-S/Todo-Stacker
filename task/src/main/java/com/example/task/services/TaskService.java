package com.example.task.services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.task.exceptions.TaskNotFoundException;
import com.example.task.models.Task;
import com.example.task.repositories.TaskRepository;
import com.example.task.utils.Status;

@Service
public class TaskService {
    
    @Autowired
    private TaskRepository taskRepository;

    public String addTask(Task task) {
        taskRepository.save(task);
        return "Task added Successfully";
    }

    public List<Task> getAllTasks(UUID userId) {
        return taskRepository.findByUserId(userId);
    }

    public Task getTaskById(UUID userId,UUID taskId) {
        return taskRepository.findTaskByUserIdAndTaskId(userId,taskId).orElseThrow(() -> new TaskNotFoundException("Task not found"));
    }

    public List<Task> getTasksByStatus(UUID userId,Status status) {
        return taskRepository.findTaskByUserIdAndStatus(userId,status);
    }

    public String updateTask(UUID userId,UUID taskId,Task oldTask) {
        Task task = taskRepository.findTaskByUserIdAndTaskId(userId,taskId).orElseThrow(() -> new TaskNotFoundException("Task not found"));
        task.setTitle(oldTask.getTitle());
        task.setDescrip(oldTask.getDescrip());
        task.setStatus(oldTask.getStatus());
        taskRepository.save(task);
        return "Task updated Successfully";
    }

    public String updateTaskStatus(UUID userId,UUID taskId,Status status) {
        Task task = taskRepository.findTaskByUserIdAndTaskId(userId,taskId).orElseThrow(() -> new TaskNotFoundException("Task not found"));
        task.setStatus(status);
        taskRepository.save(task);
        return "Task status updated Successfully";
    }

    public String deleteTask(UUID userId,UUID taskId) {
        Task task = taskRepository.findTaskByUserIdAndTaskId(userId,taskId).orElseThrow(() -> new TaskNotFoundException("Task not found"));
        taskRepository.delete(task);
        return "Task deleted Successfully";
    }
}
