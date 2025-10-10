package com.etlabapp.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class StudentProfile {

    @JsonProperty("personal_info")
    private PersonalInfo personalInfo;

    @JsonProperty("contact_info")
    private ContactInfo contactInfo;

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
        @JsonProperty("Mobile No")
        private String mobileNumber;

        public String getMobileNumber() { return mobileNumber; }
        public void setMobileNumber(String mobileNumber) { this.mobileNumber = mobileNumber; }
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
    public AcademicInfo getAcademicInfo() { return academicInfo; }
}
