import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  title: {
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 2,
    textAlignVertical: "center",
    alignSelf: "center",
    flex: 1,
  },
  input: {
    flex: 2,
    marginStart: 5,
    width: "60%",
    padding: 8,
    backgroundColor: "#e4e6ef",
    borderRadius: 12,
    marginBottom: 10,
    textAlignVertical: "center",
    flexWrap: "wrap",
  },

  photoPreview: {
    marginTop: 15,
    width: 200,
    height: 200,
    marginBottom: 10,
    resizeMode: "cover",
    backgroundColor: "grey",
    borderRadius: 6,
    borderWidth: 3,
    borderColor: "white",
  },
});
