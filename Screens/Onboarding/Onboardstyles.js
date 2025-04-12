import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  skip: {
    position: "absolute",
    top: 70,
    right: 50,
    fontSize: 16,
    color: "#999",
  },
  image: {
    width: 400,
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
  },
  image2: {
    width: 500,
    height: 400,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  titleHighlight: {
    color: "#007AC1",
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 60,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  dotActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#007AC1",
    marginHorizontal: 5,
  },
  buttonCircle: {
    backgroundColor: "#007AC1",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
