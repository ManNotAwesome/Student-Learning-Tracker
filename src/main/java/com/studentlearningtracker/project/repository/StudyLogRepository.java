package com.studentlearningtracker.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.studentlearningtracker.project.entity.StudyLog;

public interface StudyLogRepository extends JpaRepository<StudyLog, Long> {

	List<StudyLog> findBySubjectId(Long subjectId);
}
