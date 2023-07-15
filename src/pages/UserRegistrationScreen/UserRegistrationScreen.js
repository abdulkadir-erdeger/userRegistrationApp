import { ScrollView } from "react-native";
import React, { useState } from "react";

import { Formik } from "formik";
import * as Yup from "yup";
import UserInformationCard from "../../components/UserInformationCard/UserInformationCard";
import EmploymentStatusCard from "../../components/EmploymentStatusCard/EmploymentStatusCard";

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("veritabani");

const UserRegistrationScreen = ({ navigation }) => {
  const [cardForwarding, setCardForwarding] = useState(0);

  const initialValues = {
    photo: null,
    fullName: "",
    selectedCountry: "",
    selectedCity: "",
    identificationNumber: "",
    phone: "",
    selectedGender: "",
    selectedBirthDate: new Date(),
    employmentStatus: "",
    occupation: "",
    educationLevel: "",
    schoolName: "",
    graduationYear: new Date(),
    section: "",
    skills: [],
    cv: null,
    projects: [],
  };

  const validationSchema = Yup.object({
    identificationNumber: Yup.string().required("Kimlik Numarası zorunludur."),
    phone: Yup.string().required("Telefon Numarası zorunludur."),
  });

  const handleSubmit = (values) => {
    saveDataToDatabase(values);
  };

  const saveDataToDatabase = (values) => {
    const {
      photo,
      fullName,
      selectedCountry,
      selectedCity,
      identificationNumber,
      phone,
      selectedGender,
      selectedBirthDate,
      employmentStatus,
      occupation,
      educationLevel,
      schoolName,
      graduationYear,
      section,
      skills,
      cv,
      projects,
    } = values;

    db.transaction(
      (tx) => {
        tx.executeSql(
          "INSERT INTO users (photo, fullName, selectedCountry, selectedCity, identificationNumber, phone, selectedGender, selectedBirthDate, employmentStatus, occupation, educationLevel, schoolName, graduationYear, section, skills, cv, projects) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            photo ? photo : null,
            fullName,
            selectedCountry,
            selectedCity,
            identificationNumber,
            phone,
            selectedGender,
            selectedBirthDate ? selectedBirthDate.toISOString() : null,
            employmentStatus,
            occupation,
            educationLevel,
            schoolName,
            graduationYear ? graduationYear.toISOString() : null,
            section,
            JSON.stringify(skills),
            cv ? JSON.stringify(cv) : null,
            JSON.stringify(projects),
          ],
          (txObj, result) => {
            if (result.rowsAffected > 0) {
              console.log("Data saved to database");

              navigation.navigate("LoginScreen");
            } else {
              console.log("No rows affected");
            }
          },
          (txObj, error) => {
            if (error.code === 6) {
              Alert.alert("Hata", "Bu kimlik numarası zaten kaydedilmiş.");
            } else {
              console.log("Error saving data to database:", error);
            }
          }
        );
      },
      (error) => {
        console.log("Error executing database transaction:", error);
      },
      () => {
        console.log("Database transaction completed");
      }
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <>
            {cardForwarding <= 0 ? (
              <UserInformationCard
                formikProps={formikProps}
                setCardForwarding={setCardForwarding}
              />
            ) : (
              <EmploymentStatusCard
                formikProps={formikProps}
                setCardForwarding={setCardForwarding}
              />
            )}
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

export default UserRegistrationScreen;
