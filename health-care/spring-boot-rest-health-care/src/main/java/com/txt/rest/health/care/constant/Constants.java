package com.txt.rest.health.care.constant;

public class Constants {
    public static final String SEARCH_LIKE = "%";
    public static final String ORDER_ASC = "ASC";
    public static final String TRACK_ID = "traceId";
    public static final String SPACE = " ";
    public static final String LANG_VI = "vi";
    public static final String LANG_EN = "en";
    public static final String TEMPLATE_HEALTH_CARE_BOOKING_VERIFY = "HEALTH_CARE_BOOKING_VERIFY";
    public static final String SUBJECT_MAIL_VERIFY_BOOKING = "Verify booking appointment";

    public static class TypeRole {
        public static final String ROLE = "ROLE";
        public static final String STATUS = "STATUS";
        public static final String TIME = "TIME";
        public static final String POSITION = "POSITION";
    }

    public static class RoleKey {
        public static final String ADMIN = "R1";
        public static final String DOCTOR = "R2";
        public static final String PATIENT = "R3";
    }

    public static class StatusKey {
        public static final String NEW = "S1";
        public static final String CONFIRMED = "S2";
    }

    public static class MailConstant {
        public static final String EMAIL_FROM_RULE = "mail.from";
        public static final String EMAIL_CC_RULE = "mail.cc";
        public static final String URL_UI_HEALTH_CARE = "urls.ui-domain-health-care";
        public static final String EMAIL_UUID = "uuid";
        public static final String TEMPLATE_NAME = "templateName";
        public static final String EMAIL_TO = "emailTo";
        public static final String EMAIL_CC = "emailCc";
        public static final String EMAIL_SUBJECT = "emailSubject";
        public static final String CONTENT_TYPE = "text/html;charset=utf-8";
        public static final String EMAIL_PARAMS = "params";
    }

    public static class Params {
        public static final String PATIEN_NAME = "patientName";
        public static final String DOCTOR_NAME = "doctorName";
        public static final String TIME = "time";
        public static final String URL = "url";
        public static final String LANGUAGE = "language";
    }

}
