package com.studentlearningtracker.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.studentlearningtracker.project.entity.Subject;

public interface SubjectRepository extends JpaRepository<Subject, Long> {

}
