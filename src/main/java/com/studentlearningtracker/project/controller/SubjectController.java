package com.studentlearningtracker.project.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.studentlearningtracker.project.entity.Subject;
import com.studentlearningtracker.project.service.SubjectService;

@RestController
@RequestMapping("/subjects")
public class SubjectController {

	private final SubjectService subjectService;

	public SubjectController(SubjectService subjectService) {
		this.subjectService = subjectService;
	}

	@PostMapping
	public Subject createSubject(@RequestBody Subject subject) {
		return subjectService.createSubject(subject);
	}

	@GetMapping
	public List<Subject> getAllSubjects() {
		return subjectService.getAllSubjects();
	}

	@DeleteMapping("/{id}")
	public void deleteSubject(@PathVariable Long id) {
		subjectService.deleteSubject(id);
	}
}
