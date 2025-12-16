package com.studentlearningtracker.project.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.studentlearningtracker.project.entity.Subject;
import com.studentlearningtracker.project.repository.SubjectRepository;

@Service
public class SubjectService {

	private final SubjectRepository subjectRepository;

	public SubjectService(SubjectRepository subjectRepository) {
		this.subjectRepository = subjectRepository;
	}

	public Subject createSubject(Subject subject) {
		return subjectRepository.save(subject);
	}

	public List<Subject> getAllSubjects() {
		return subjectRepository.findAll();
	}

	public void deleteSubject(Long subjectId) {
		if (!subjectRepository.existsById(subjectId)) {
			throw new RuntimeException("Subject not found");
		}
		subjectRepository.deleteById(subjectId);
	}
}
