import "react-native-gesture-handler";
import Router from "./src/Router";

import * as SQLite from "expo-sqlite";
import { useEffect } from "react";

const db = SQLite.openDatabase("veritabani");

export default function App() {
  const createDatabaseTables = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS users(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          photo TEXT,
          fullName TEXT,
          selectedCountry TEXT,
          selectedCity TEXT,
          identificationNumber TEXT NOT NULL UNIQUE,
          phone TEXT NOT NULL,
          selectedGender TEXT,
          selectedBirthDate DATE,
          employmentStatus TEXT,
          occupation TEXT,
          educationLevel TEXT,
          schoolName TEXT,
          graduationYear DATE,
          section TEXT,
          skills TEXT,
          cv TEXT,
          projects TEXT
        );`,
        [],
        (tx, result) => {
          console.log("Database tables created");
        },
        (error) => {
          console.log("Error creating database tables:", error);
        }
      );
    });
  };

  useEffect(() => {
    createDatabaseTables();
  }, []);

  return <Router />;
}
