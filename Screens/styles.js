import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#007AC1",
    height: 60,
    justifyContent: "center",
    marginTop: 10,
    width: 370,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  cardContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginTop: 20,
    padding: 15,
  },
  cardItem: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  cs1: {
    alignSelf: "center",
    height: 320,
    width: 320,
  },
  fares: {
    alignSelf: "center",
    height: 185,
    resizeMode: "contain",
    width: 400,
  },
  greyButton: {
    alignItems: "center",
    backgroundColor: "#A9A9A9",
    borderRadius: 0,
    height: 50,
    justifyContent: "center",
    width: 140,
  },
  input: {
    marginBottom: 10,
  },
  logo: {
    alignSelf: "center",
    height: 150,
    marginBottom: 20,
    marginTop: 40,
    width: 450,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  tableHeader: {
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingBottom: 5,
  },
  tableHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    width: "30%",
  },
  tableRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  tableText: {
    fontSize: 14,
    width: "30%",
  },
  title: {
    alignSelf: "center",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  titleHighlight: {
    color: "#007AC1",
    fontWeight: "bold",
  },
});

export default styles;
