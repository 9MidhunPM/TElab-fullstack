package com.etlabapp.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class StudentProfile {

    @JsonProperty("personal_info")
    private PersonalInfo personalInfo;

    @JsonProperty("contact_info")
    private ContactInfo contactInfo;

    @JsonProperty("additional_info")
    private AdditionalInfo additionalInfo;

    @JsonProperty("academic_info")
    private AcademicInfo academicInfo;

    // Inner classes for only the fields you need
    public static class PersonalInfo {
        @JsonProperty("Name")
        private String name;

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
    }

    public static class ContactInfo {
        @JsonProperty("Email")
        private String email;

        @JsonProperty("Father's Mobile No")
        private String fatherMobileNo;

        @JsonProperty("Mother's Mobile No")
        private String motherMobileNo;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getFatherMobileNo() { return fatherMobileNo; }
        public void setFatherMobileNo(String fatherMobileNo) { this.fatherMobileNo = fatherMobileNo; }

        public String getMotherMobileNo() { return motherMobileNo; }
        public void setMotherMobileNo(String motherMobileNo) { this.motherMobileNo = motherMobileNo; }
    }

    public static class AdditionalInfo {
        @JsonProperty("Student Mobile No")
        private String studentMobileNo;

        public String getStudentMobileNo() { return studentMobileNo; }
        public void setStudentMobileNo(String studentMobileNo) { this.studentMobileNo = studentMobileNo; }
    }

    public static class AcademicInfo {
        @JsonProperty("SR No")
        private String srNumber;

        @JsonProperty("University Reg No")
        private String universityRegNo;

        public String getSrNumber() { return srNumber; }
        public void setSrNumber(String srNumber) { this.srNumber = srNumber; }

        public String getUniversityRegNo() { return universityRegNo; }
        public void setUniversityRegNo(String universityRegNo) { this.universityRegNo = universityRegNo; }
    }

    // Getters for outer class
    public PersonalInfo getPersonalInfo() { return personalInfo; }
    public ContactInfo getContactInfo() { return contactInfo; }
    public AdditionalInfo getAdditionalInfo() { return additionalInfo; }
    public AcademicInfo getAcademicInfo() { return academicInfo; }
}
