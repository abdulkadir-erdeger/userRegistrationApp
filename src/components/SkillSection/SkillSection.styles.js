import { StyleSheet } from "react-native";

export default StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
  skillsContainer: {},
  skillsRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  skillRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    padding: 3,
    borderRadius: 8,
    backgroundColor: "#e4e6ef",
    padding: 5,
  },
  skillText: {
    flex: 1,
    fontSize: 14,
  },
  degreeText: {
    fontSize: 14,
    marginRight: 10,
  },
  removeSkillButton: {
    padding: 5,
    backgroundColor: "red",
    borderRadius: 5,
    marginStart: 5,
  },
  removeSkillButtonText: {
    color: "white",
    fontSize: 12,
  },
  addSkillContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  skillInput: {
    flex: 2,
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: "#e4e6ef",
    borderColor: "#CCC",
  },
  dropdownContainer: {
    borderColor: "gray",
    borderWidth: 1,
    justifyContent: "center",
    borderRadius: 8,
  },
  degreePicker: {
    flex: 1.1,
    height: 40,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    justifyContent: "center",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: "#e4e6ef",
    borderColor: "#CCC",
  },
  addButton: {
    padding: 10,
    backgroundColor: "#007AFF",
    borderRadius: 5,
    marginStart: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  addButtonText: {
    color: "white",
    fontSize: 14,
  },
});
