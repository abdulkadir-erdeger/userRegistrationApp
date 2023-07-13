import { StyleSheet } from "react-native";

export default StyleSheet.create({
  projectContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
  },
  projectInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderBottomLeftRadius: 8,
    backgroundColor: "#e4e6ef",
  },
  removeProjectButton: {
    alignSelf: "flex-end",
    backgroundColor: "red",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  removeProjectButtonText: {
    color: "#FFF",
  },
  addProjectButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginStart: "50%",
  },
  addProjectButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});
