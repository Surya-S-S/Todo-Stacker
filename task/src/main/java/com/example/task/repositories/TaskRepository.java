package com.example.task.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.task.models.Task;
import com.example.task.utils.Status;

@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {
    List<Task> findByUserId(UUID userId);
    Optional<Task> findTaskByUserIdAndTaskId(UUID userId,UUID taskId);
    List<Task> findTaskByUserIdAndStatus(UUID userId,Status status);
}