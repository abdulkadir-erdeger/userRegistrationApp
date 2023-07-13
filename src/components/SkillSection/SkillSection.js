import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "./SkillSection.styles";
import { Picker } from "@react-native-picker/picker";
import { useFormikContext } from "formik";

const SkillSection = () => {
  const { values, setFieldValue } = useFormikContext();
  const [newSkill, setNewSkill] = useState("");
  const [newDegree, setNewDegree] = useState("1");

  const addSkill = () => {
    const newSkills = [
      ...values.skills,
      { skill: newSkill, degree: newDegree },
    ];
    setFieldValue("skills", newSkills);
    setNewSkill("");
    setNewDegree("1");
  };

  const removeSkill = (index) => {
    const updatedSkills = [...values.skills];
    updatedSkills.splice(index, 1);
    setFieldValue("skills", updatedSkills);
  };

  return (
    <View style={{ width: "80%" }}>
      <View style={styles.skillsContainer}>
        {values.skills.map((item, index) => (
          <View key={index} style={styles.skillsRowContainer}>
            <View style={styles.skillRow}>
              <Text style={styles.skillText}>{item.skill}</Text>
              <Text style={styles.degreeText}>{item.degree}</Text>
            </View>
            <TouchableOpacity
              style={styles.removeSkillButton}
              onPress={() => removeSkill(index)}
            >
              <Text style={styles.removeSkillButtonText}>Kaldır</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.addSkillContainer}>
        <TextInput
          style={styles.skillInput}
          placeholder="Yetkinlik"
          value={newSkill}
          onChangeText={(text) => setNewSkill(text)}
        />
        <View style={styles.degreePicker}>
          <Picker
            selectedValue={newDegree}
            onValueChange={(value) => setNewDegree(value)}
          >
            <Picker.Item label="1" value={1} />
            <Picker.Item label="2" value={2} />
            <Picker.Item label="3" value={3} />
            <Picker.Item label="4" value={4} />
            <Picker.Item label="5" value={5} />
          </Picker>
        </View>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={addSkill}>
        <Text style={styles.addButtonText}>Ekle</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SkillSection;
