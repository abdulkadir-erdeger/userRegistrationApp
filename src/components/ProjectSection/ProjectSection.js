import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  LogBox,
} from "react-native";
import { useFormikContext } from "formik";
import styles from "./ProjectSection.style";
import { useEffect } from "react";

const ProjectSection = () => {
  const { values, setFieldValue } = useFormikContext();

  const handleAddProject = () => {
    const projects = [...values.projects];
    projects.push({ title: "", description: "" });
    setFieldValue("projects", projects);
  };

  const handleRemoveProject = (index) => {
    const projects = [...values.projects];
    projects.splice(index, 1);
    setFieldValue("projects", projects);
  };

  const handleProjectTitleChange = (index, title) => {
    const projects = [...values.projects];
    projects[index].title = title;
    setFieldValue("projects", projects);
  };

  const handleProjectDescriptionChange = (index, description) => {
    const projects = [...values.projects];
    projects[index].description = description;
    setFieldValue("projects", projects);
  };

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  return (
    <>
      <FlatList
        data={values.projects}
        style={{ width: "80%" }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.projectContainer}>
            <TextInput
              style={styles.projectInput}
              placeholder="Proje Başlığı"
              value={item.title}
              onChangeText={(text) => handleProjectTitleChange(index, text)}
            />
            <TextInput
              style={styles.projectInput}
              placeholder="Proje Açıklaması"
              value={item.description}
              onChangeText={(text) =>
                handleProjectDescriptionChange(index, text)
              }
            />
            <TouchableOpacity
              style={styles.removeProjectButton}
              onPress={() => handleRemoveProject(index)}
            >
              <Text style={styles.removeProjectButtonText}>Projeyi Kaldır</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addProjectButton}
        onPress={handleAddProject}
      >
        <Text style={styles.addProjectButtonText}>Proje Ekle</Text>
      </TouchableOpacity>
    </>
  );
};

export default ProjectSection;
