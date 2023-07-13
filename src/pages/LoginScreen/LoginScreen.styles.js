import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#e4e6ef",
    borderColor: "#CCC",
  },
  registerButton: {
    width: "80%",
    alignItems: "flex-end",
    paddingVertical: 3,
    marginBottom: 10,
  },
  registerButtonText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#50cd89",
    marginRight: 10,
  },
  button: {
    width: "80%",
    height: 40,
    backgroundColor: "#00b2ff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  buttonTitle: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "flex-end",
    backgroundColor: "white",
  },
  logo: {
    width: 100,
    height: 100,
  },
});
