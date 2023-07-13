import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    width: "80%",
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 2,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputButton: { width: "80%", height: 40 },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "gray",
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: "blue",
    borderColor: "blue",
  },
  checkboxText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    width: "80%",
    backgroundColor: "blue",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 10,
  },
  buttonTitle: {
    fontSize: 16,
    color: "white",
  },
  photoButton: {
    marginBottom: 10,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  photoButtonText: {
    color: "white",
    fontSize: 16,
  },
  photoPreview: {
    marginTop: 15,
    width: 200,
    height: 200,
    marginBottom: 10,
    resizeMode: "cover",
    backgroundColor: "grey",
    borderRadius: 6,
  },
  dropdownContainer: {
    width: "80%",
    marginBottom: 10,
    borderColor: "gray",
    borderWidth: 1,
    justifyContent: "center",
  },
  dropdownLabel: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  dropdown: {
    height: 40,
  },
  datePickerButton: {
    marginBottom: 10,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  datePickerButtonText: {
    color: "white",
    fontSize: 16,
  },
});
