package com.studentlearningtracker.project.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.studentlearningtracker.project.entity.StudyLog;
import com.studentlearningtracker.project.entity.Subject;
import com.studentlearningtracker.project.repository.StudyLogRepository;
import com.studentlearningtracker.project.repository.SubjectRepository;

@Service
public class StudyLogService {

	private final StudyLogRepository studyLogRepository;

	private final SubjectRepository subjectRepository;

	public StudyLogService(StudyLogRepository studyLogRepository, SubjectRepository subjectRepository) {
		this.studyLogRepository = studyLogRepository;
		this.subjectRepository = subjectRepository;
	}

	public StudyLog addStudyLog(Long subjectId, String description) {

		Subject subject = subjectRepository.findById(subjectId)
				.orElseThrow(() -> new RuntimeException("Subject not found"));

		StudyLog log = new StudyLog();
		log.setDescription(description);
		log.setStudyDate(LocalDate.now());
		log.setSubject(subject);

		return studyLogRepository.save(log);
	}

	public List<StudyLog> getLogsForSubjects(Long subjectId) {
		return studyLogRepository.findBySubjectId(subjectId);
	}

	public void deleteStudyLog(Long logId) {
		if (!studyLogRepository.existsById(logId)) {
			throw new RuntimeException("Study Log Not Found");
		}
		studyLogRepository.deleteById(logId);
	}
}
