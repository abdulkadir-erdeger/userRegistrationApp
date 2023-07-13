import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import styles from "./EmploymentStatusCard.style";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as DocumentPicker from "expo-document-picker";
import { useFormikContext } from "formik";
import ProjectSection from "../ProjectSection/ProjectSection";
import SkillSection from "../SkillSection/SkillSection";

const EmploymentStatusCard = ({ formikProps, setCardForwarding }) => {
  const { values, setFieldValue } = useFormikContext();
  const [show, setShow] = useState(false);

  const formatDate = (rawDate) => {
    let date = new Date(rawDate);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${day}-${month}-${year}`;
  };

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setShow(false);
      setFieldValue("graduationYear", currentDate);
    }
  };

  const selectDoc = async () => {
    try {
      const doc = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      setFieldValue("cv", doc);
    } catch (err) {
      if (DocumentPicker.isCancel(err))
        console.log("User cancelled the upload", err);
      else console.log(err);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setCardForwarding((prev) => prev - 1)}
      >
        <Text style={styles.buttonTitle}>Geri</Text>
      </TouchableOpacity>

      <Text style={styles.title2}>Çalışma Durumu ve Meslek Bilgileri</Text>

      <Text style={styles.title}>Çalışma Durumu</Text>
      <View style={styles.dropdownContainer}>
        <Picker
          style={styles.dropdown}
          selectedValue={values.employmentStatus}
          onValueChange={(e) => setFieldValue("employmentStatus", e)}
        >
          <Picker.Item label="Seçiniz" value="" />
          <Picker.Item label="Öğrenci" value="Öğrenci" />
          <Picker.Item label="Çalışan" value="Çalışan" />
          <Picker.Item label="İşsiz" value="İşsiz" />
        </Picker>
      </View>

      <Text style={styles.title}>Meslek</Text>
      <TextInput
        style={styles.input}
        placeholder="Meslek"
        value={values.occupation}
        onChangeText={(e) => setFieldValue("occupation", e)}
      />

      <Text style={[styles.title2, { marginTop: 10 }]}>
        Eğitim Seviyesi ve Yetkinlik Bilgileri
      </Text>

      <Text style={styles.title}>Eğitim Seviyesi</Text>
      <View style={styles.dropdownContainer}>
        <Picker
          style={styles.dropdown}
          selectedValue={values.educationLevel}
          onValueChange={(e) => setFieldValue("educationLevel", e)}
        >
          <Picker.Item label="Seçiniz" value="" />
          <Picker.Item label="İlkokul" value="ilkokul" />
          <Picker.Item label="Lise" value="lise" />
          <Picker.Item label="Üniversite" value="üniversite" />
        </Picker>
      </View>

      <Text style={styles.title}>Okul Adı</Text>
      <TextInput
        style={styles.input}
        placeholder="Okul Adı"
        value={values.schoolName}
        onChangeText={(e) => setFieldValue("schoolName", e)}
      />

      <Text style={styles.title}>Bölüm</Text>
      <TextInput
        style={styles.input}
        placeholder="Bölüm"
        value={values.section}
        onChangeText={(e) => setFieldValue("section", e)}
      />

      <Text style={styles.title}>Mezuniyet Tarihi</Text>
      <Pressable style={styles.inputButton} onPress={() => setShow(true)}>
        <TextInput
          style={[styles.input, { width: "auto" }]}
          placeholder="Mezuniyet Tarihi"
          editable={false}
          value={formatDate(values.graduationYear)}
        />
        {show && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={values.graduationYear}
            onChange={onChange}
          />
        )}
      </Pressable>

      <Text style={[styles.title, { marginTop: 10 }]}>
        Yetkinlik Dereceleri
      </Text>
      <SkillSection />

      <Text style={[styles.title2, { marginTop: 10 }]}>CV ve Proje Alanı</Text>

      <Text style={styles.title}>CV</Text>
      {values.cv && (
        <Text style={[styles.title, { color: "red" }]}>{values.cv?.name}</Text>
      )}

      <TouchableOpacity
        style={styles.button2}
        title="CV Yükle"
        onPress={selectDoc}
      >
        <Text style={styles.buttonTitle2}>CV Yükle</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Projeler</Text>
      <ProjectSection />

      <Text style={[styles.title2, { marginTop: 10 }]}></Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => formikProps.handleSubmit(formikProps.values)}
      >
        <Text style={styles.buttonTitle}>Kayıt Ol</Text>
      </TouchableOpacity>
    </>
  );
};

export default EmploymentStatusCard;
