package com.studentlearningtracker.project.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.studentlearningtracker.project.entity.StudyLog;
import com.studentlearningtracker.project.service.StudyLogService;

@RestController
@RequestMapping("/logs")
public class StudyLogContoller {

	private final StudyLogService studyLogService;

	public StudyLogContoller(StudyLogService studyLogService) {
		this.studyLogService = studyLogService;
	}

	@PostMapping("/{subjectId}")
	public StudyLog addStudyLog(@PathVariable Long subjectId, @RequestParam String description) {
		return studyLogService.addStudyLog(subjectId, description);
	}

	@GetMapping("/{subjectId}")
	public List<StudyLog> getLogs(@PathVariable Long subjectId) {
		return studyLogService.getLogsForSubjects(subjectId);
	}

	@DeleteMapping("/{logId}")
	public void deleteLog(@PathVariable Long logId) {
		studyLogService.deleteStudyLog(logId);
	}
}
