import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    padding: 20,
  },
  logo: {
    width: 450,
    height: 150,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  secondImage: {
    width: 400,
    height: 200,
    alignSelf: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
  link: {
    marginTop: 20,
    textAlign: "center",
    color: "#007BFF",
  },
});

export default styles;
