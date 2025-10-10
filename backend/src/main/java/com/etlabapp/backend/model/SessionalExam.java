package com.etlabapp.backend.model;

public class SessionalExam {
    private String subjectName;
    private String subjectCode;
    private String semester;
    private String marksObtained;
    private String maximumMarks;
    private String exam;

    // Default constructor
    public SessionalExam() {}

    // Constructor with all fields
    public SessionalExam(String subjectName, String subjectCode, String semester, 
                        String marksObtained, String maximumMarks, String exam) {
        this.subjectName = subjectName;
        this.subjectCode = subjectCode;
        this.semester = semester;
        this.marksObtained = marksObtained;
        this.maximumMarks = maximumMarks;
        this.exam = exam;
    }

    // Getters and Setters
    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public String getSubjectCode() {
        return subjectCode;
    }

    public void setSubjectCode(String subjectCode) {
        this.subjectCode = subjectCode;
    }

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public String getMarksObtained() {
        return marksObtained;
    }

    public void setMarksObtained(String marksObtained) {
        this.marksObtained = marksObtained;
    }

    public String getMaximumMarks() {
        return maximumMarks;
    }

    public void setMaximumMarks(String maximumMarks) {
        this.maximumMarks = maximumMarks;
    }

    public String getExam() {
        return exam;
    }

    public void setExam(String exam) {
        this.exam = exam;
    }

    @Override
    public String toString() {
        return "SessionalExam{" +
                "subjectName='" + subjectName + '\'' +
                ", subjectCode='" + subjectCode + '\'' +
                ", semester='" + semester + '\'' +
                ", marksObtained='" + marksObtained + '\'' +
                ", maximumMarks='" + maximumMarks + '\'' +
                ", exam='" + exam + '\'' +
                '}';
    }
}