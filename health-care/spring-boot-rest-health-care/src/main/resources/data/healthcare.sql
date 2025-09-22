----------------------------HEALTH CARE--------------------------------

DROP TABLE users;

CREATE TABLE "public"."users" (
                                  "id" int8 NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1),
                                  "first_name" varchar(255) DEFAULT NULL,
                                  "last_name" varchar(255) DEFAULT NULL,
                                  "email" varchar(50) DEFAULT NULL,
                                  "password" varchar(255) DEFAULT NULL,
                                  "address" varchar(255) DEFAULT NULL,
                                  "phone_number" varchar(50) DEFAULT NULL,
                                  "gender" bool,
                                  "image" varchar(50) DEFAULT NULL,
                                  "role_key" varchar(50) DEFAULT NULL,
                                  "position_key" varchar(50) DEFAULT NULL,
                                  "created_date" timestamp(0),
                                  "updated_date" timestamp(0),
                                  PRIMARY KEY ("id"),
                                  CONSTRAINT fk_user_role_key FOREIGN KEY ("role_key") REFERENCES all_code("key")
);

--------------------------------------------------------
ALTER TABLE "public"."users" ALTER COLUMN "gender" TYPE varchar(50);
ALTER TABLE users RENAME COLUMN role_id TO role_key;
ALTER TABLE users RENAME COLUMN position_id TO position_key;
ALTER TABLE "public"."users" ADD COLUMN position_key varchar(50) DEFAULT NULL;

--ALTER TABLE "public"."users" ADD FOREIGN KEY ("role_key") REFERENCES all_code("key");
ALTER TABLE "public"."users" ADD CONSTRAINT fk_user_role_key FOREIGN KEY ("role_key") REFERENCES all_code("key");

--------------------------------------------------------

CREATE TABLE "public"."all_code" (
    --"id" int8 NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1),
                                     "key" varchar(50) NOT NULL,
                                     "type" varchar(50) DEFAULT NULL,
                                     "value_en" varchar(255) DEFAULT NULL,
                                     "value_vi" varchar(255) DEFAULT NULL,
                                     PRIMARY KEY ("key")
);

CREATE TABLE "public"."booking" (
                                    "id" int8 NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1),
                                    "doctor_id" int8 DEFAULT NULL,
                                    "patient_id" int8 DEFAULT NULL,
                                    "status_key" varchar(50) DEFAULT NULL,
                                    "time_key" varchar(50) DEFAULT NULL,
                                    "date" date DEFAULT NULL,
                                    "token" varchar(50) DEFAULT NULL,
                                    "reason" varchar(50) DEFAULT NULL,
                                    "birthday" varchar(50) DEFAULT NULL,
                                    "created_date" timestamp(0),
                                    "updated_date" timestamp(0),
                                    PRIMARY KEY ("id")
);

ALTER TABLE "public"."booking" ADD CONSTRAINT fk_booking_time_key FOREIGN KEY ("time_key") REFERENCES all_code("key");
ALTER TABLE "public"."booking" ADD CONSTRAINT fk_booking_status_key FOREIGN KEY ("status_key") REFERENCES all_code("key");
ALTER TABLE "public"."booking" ADD CONSTRAINT fk_booking_doctor_id FOREIGN KEY ("doctor_id") REFERENCES users("id");
ALTER TABLE "public"."booking" ADD CONSTRAINT fk_booking_patient_id FOREIGN KEY ("patient_id") REFERENCES users("id");
--------------------------------------------------------
CREATE TABLE "public"."schedule" (
                                     "id" int8 NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1),
                                     "doctor_id" int8 DEFAULT NULL,
                                     "date" date DEFAULT NULL,
                                     "time_key" varchar(50) DEFAULT NULL,
                                     "current_number" int8 DEFAULT NULL,
                                     "max_number" int8 DEFAULT NULL,
                                     "created_date" timestamp(0),
                                     "updated_date" timestamp(0),
                                     CONSTRAINT fk_schedule_time_key FOREIGN KEY ("time_key") REFERENCES all_code("key")
                                         PRIMARY KEY ("id")
);

--------------------------------------------------------
ALTER TABLE "public"."schedule" ADD CONSTRAINT fk_schedule_time_key FOREIGN KEY ("time_key") REFERENCES all_code("key");

--------------------------------------------------------


CREATE TABLE "public"."history" (
                                    "id" int8 NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1),
                                    "patient_key" int8 DEFAULT NULL,
                                    "doctor_key" int8 DEFAULT NULL,
                                    "description" varchar(255) DEFAULT NULL,
                                    "files" varchar(255) DEFAULT NULL,
                                    "created_date" timestamp(0),
                                    "updated_date" timestamp(0),
                                    PRIMARY KEY ("id")
);


CREATE TABLE "public"."clinic" (
                                   "id" int8 NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1),
                                   "name" varchar(255) DEFAULT NULL,
                                   "address" varchar(255) DEFAULT NULL,
                                   "description" varchar(255) DEFAULT NULL,
                                   "image" varchar(255) DEFAULT NULL,
                                   PRIMARY KEY ("id")
);

CREATE TABLE "public"."speciality" (
                                       "id" int8 NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1),
                                       "name" varchar(255) DEFAULT NULL,
                                       "description" varchar(255) DEFAULT NULL,
                                       "image" varchar(255) DEFAULT NULL,
                                       PRIMARY KEY ("id")
);

CREATE TABLE "public"."doctor_clinic_specialty" (
                                                    "id" int8 NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1),
                                                    "doctor_key" varchar(255) DEFAULT NULL,
                                                    "clinic_key" varchar(255) DEFAULT NULL,
                                                    "speciality_key" varchar(50) DEFAULT NULL,
                                                    PRIMARY KEY ("id")
);


------------------------------------------------------------------
CREATE TABLE "public"."doctor" (
                                   "id" int8 NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1),
                                   "doctor_id" int8 DEFAULT NULL,
                                   "price_key" varchar(255) DEFAULT NULL,
                                   "province_key" varchar(255) DEFAULT NULL,
                                   "payment_key" varchar(255) DEFAULT NULL,
                                   "address_clinic" varchar(255) DEFAULT NULL,
                                   "name_clinic" varchar(255) DEFAULT NULL,
                                   "note" varchar(255) DEFAULT NULL,
                                   "count" int8 DEFAULT NULL,
                                   "created_date" timestamp(0),
                                   "updated_date" timestamp(0),
                                   PRIMARY KEY ("id"),
                                   CONSTRAINT fk_doctor_price_key FOREIGN KEY ("price_key") REFERENCES all_code("key"),
                                   CONSTRAINT fk_doctor_province_key FOREIGN KEY ("province_key") REFERENCES all_code("key"),
                                   CONSTRAINT fk_doctor_payment_key FOREIGN KEY ("payment_key") REFERENCES all_code("key")
);

----------------------------------------------------------------------------------------


CREATE TABLE "public"."markdown" (
                                     "id" int8 NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1),
                                     "doctor_id" int8 DEFAULT NULL,
                                     "clinic_id" int8 DEFAULT NULL,
                                     "speciality_id" int8 DEFAULT NULL,
                                     "content_html" TEXT DEFAULT NULL,
                                     "content_markdown" TEXT DEFAULT NULL,
                                     "description" TEXT,
                                     "created_date" timestamp(0),
                                     "updated_date" timestamp(0),
                                     PRIMARY KEY ("id")
);


------------------------------------------------------------------
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('ROLE', 'R1', 'Admin', 'Quản trị viên');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('ROLE', 'R2', 'Doctor', 'Bác sĩ');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('ROLE', 'R3', 'Patient', 'Bệnh nhân');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('STATUS', 'S1', 'New', 'Lịch hẹn mới');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('STATUS', 'S2', 'Confirmed', 'Đã xác nhận');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('STATUS', 'S3', 'Done', 'Đã khám xong');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('STATUS', 'S4', 'Cancel', 'Đã hủy');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('TIME', 'T1', '8:00 AM - 9:00 AM', '8:00-9:00');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('TIME', 'T2', '9:00 AM - 10:00 AM', '9:00 - 10:00');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('TIME', 'T3', '10:00 AM - 11:00 AM', '10:00 - 11:00');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('TIME', 'T4', '11:00 AM - 0:00 PM', '11:00-12:00');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('TIME', 'T5', '1:00 PM - 2:00 PM', '13:00 - 14:00');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('TIME', 'T6', '2:00 PM - 3:00 PM', '14:00 - 15:00');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('TIME', 'T7', '3:00 PM - 4:00 PM', '15:00 - 16:00');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('TIME', 'T8', '4:00 PM - 5:00 PM', '16:00 - 17:00');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('POSITION', 'P0', 'None', 'Bác sĩ');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('POSITION', 'P1', 'Master', 'Thạc sĩ');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('POSITION', 'P2', 'Doctor', 'Tiến sĩ');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('POSITION', 'P3', 'Associate Professor', 'Phó giáo sư');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('POSITION', 'P4', 'Professor', 'Giáo sư');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('GENDER', 'M', 'Male', 'Nam');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('GENDER', 'F', 'Female', 'Nữ');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('GENDER', 'O', 'Other', 'Khác');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('PRICE', 'PRI1', '10', '20000');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('PRICE', 'PRI2', '15', '25000');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('PRICE', 'PRI3', '20', '30000');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('PRICE', 'PRI4', '25', '50000');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('PRICE', 'PRI5', '30', '70000');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('PRICE', 'PRI6', '40', '80000');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('PRICE', 'PRI7', '50', '90000');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('PAYMENT', 'PAY1', 'Cash', 'Tiền mặt');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('PAYMENT', 'PAY2', 'Bank cards', 'Thẻ ATM');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('PAYMENT', 'PAY3', 'E-Wallets', 'Ví điện tử');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('PAYMENT', 'PAY4', 'All payment method', 'Tất cả');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('PROVINCE', 'PROV1', 'Ha Noi', 'Hà Nội');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('PROVINCE', 'PROV2', 'Sai Gon', 'Sài Gòn');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('PROVINCE', 'PROV3', 'Hue', 'Huế');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('PROVINCE', 'PROV4', 'Da Nang', 'Đà Nẵng');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('PROVINCE', 'PROV5', 'Can Tho', 'Cần Thơ');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('PROVINCE', 'PROV6', 'Hai Phong', 'Hải Phòng');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('PROVINCE', 'PROV7', 'Da Lat', 'Đà Lạt');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('PROVINCE', 'PROV8', 'Khanh Hoa', 'Khánh Hòa');
INSERT INTO all_code (type, key, "value_en", "value_vi") values ('PROVINCE', 'PROV9', 'Dong Nai', 'Đồng Nai');

--------------------------------------------FINISH--------------------------------------------