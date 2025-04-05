import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity } from "react-native";
import { Button, Text, TextInput, Card, RadioButton, Menu } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../data/firebase";
import { signOut } from "firebase/auth";
import Ionicons from "react-native-vector-icons/Ionicons";
import { addDoc, collection, getDocs, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../data/firebase"; 

const HomeScreen = () => {
  const navigation = useNavigation();
  const [showPassManager, setShowPassManager] = useState(false);
  const [cardSerial, setCardSerial] = useState("");
  const [reTypeCardSerial, setReTypeCardSerial] = useState("");
  const [cardName, setCardName] = useState("");
  const [showBagunca, setShowBagunca] = useState(false); 
  const [selectedCard, setSelectedCard] = useState(null); // Estado para o cartão selecionado
  const [planTrip, setPlanTrip] = useState(false)
  const [fares, setFares] = useState(false)
  const [busPasses, setBusPasses] = useState([]);
  const [showAddValueCard, setShowAddValueCard] = useState(false);
const [selectedValue, setSelectedValue] = useState("");
const [selectedPaymentCard, setSelectedPaymentCard] = useState("");
const [paymentCards, setPaymentCards] = useState([]);
const [valueMenuVisible, setValueMenuVisible] = useState(false);
const [cardMenuVisible, setCardMenuVisible] = useState(false);
const [hoveredCard, setHoveredCard] = useState(null);




  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "BusPass", ), (snapshot) => {
      const passes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBusPasses(passes);
    
    });
  
    return () => unsubscribe(); // limpa o listener quando desmontar
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Payment"), (snapshot) => {
      const cards = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPaymentCards(cards);
    });
  
    return () => unsubscribe(); // Limpa o listener quando o componente for desmontado
  }, []);


  const handleConfirmAddValue = async () => {
    const busPass = busPasses.find((card) => card.cardName === selectedCard);
    if (!busPass || !selectedValue) return;
  
    const numericBalance = Number(busPass.balance.replace("$", ""));
    const numericAdd = Number(selectedValue.replace("$", ""));
    const updatedBalance = `$${numericBalance + numericAdd}`;
  
    try {
      const docRef = doc(db, "BusPass", busPass.id);
      await updateDoc(docRef, { balance: updatedBalance });
      alert("Balance updated!");
      setShowAddValueCard(false);
      setSelectedValue("");
      setSelectedPaymentCard("");
    } catch (error) {
      console.error("Error updating balance: ", error);
      alert("Failed to update balance.");
    }
  };
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("Login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };


//handle Save new pass 
const handleSavePass = async () => {
  if (cardSerial && reTypeCardSerial && cardName && cardSerial === reTypeCardSerial) {
    try {
      await addDoc(collection(db, "BusPass"), {
        cardSerial,
        cardName,
        balance: "$0", // Inicial Balance
        createdAt: new Date(),
      });
      alert("Buspass saved successfully!");
      clearFields();
    } catch (error) {
      console.error("Error saving buspass: ", error);
      alert("Failed to save buspass.");
    }
  } else {
    alert("Please fill all fields correctly.");
  }
};
// handle delete pass
const handleDeleteCard = async () => {
  const cardToDelete = busPasses.find((card) => card.cardName === selectedCard);
  if (cardToDelete) {
    try {
      await deleteDoc(doc(db, "BusPass", cardToDelete.id));
      alert("Card deleted successfully!");
      setSelectedCard(null); // limpa seleção
    } catch (error) {
      console.error("Error deleting card: ", error);
      alert("Failed to delete card.");
    }
  }
};




// handle clear fields 
const clearFields = () => {
  setCardSerial("");
  setReTypeCardSerial("");
  setCardName("");
};

// handle mask number of credit card 
const formatCardNumber = (cardNumber) => {
  const lastFourDigits = cardNumber.slice(-4);
  const maskedNumber = `**** **** **** ${lastFourDigits}`;
  return maskedNumber;
};

const formatCardField = (cardNumber) => {
  if (!cardNumber || cardNumber.length < 4) return "";
  const lastFour = cardNumber.slice(-4);
  return `**** **** **** ${lastFour}`;
};

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={require("../assets/ltclogo.png")} style={styles.logo} />
        <Text style={styles.title}>Welcome to the Home Page!</Text>

        

        
          <Button 
          mode="contained" 
          onPress={() => setShowBagunca(!showBagunca)} 
          style={styles.button}
          buttonColor="#0a7ac0"
          icon={() => (
            <Ionicons 
              name={showBagunca ? "remove" : "add"} 
              size={20} 
              color="white" 
            />
          )}
        >
          Manage Pass
        </Button>

        {showAddValueCard && (
          <Card style={styles.cardContainer}>
            <Card.Content>
              <Text style={styles.cardTitle}>Add Value to Card</Text>
              <Text>Select Value:</Text>
              <Menu
                visible={valueMenuVisible}
                onDismiss={() => setValueMenuVisible(false)}
                anchor={
                  <TouchableOpacity onPress={() => setValueMenuVisible(true)}>
                    <TextInput mode="outlined" label="Select Value" value={selectedValue} editable={false} />
                  </TouchableOpacity>
                }
              >
                {["$10", "$20", "$30"].map((val) => (
                  <Menu.Item
                    key={val}
                    onPress={() => {
                      setSelectedValue(val);
                      setValueMenuVisible(false);
                    }}
                    title={val}
                  />
                ))}
              </Menu>

              <Menu
                visible={cardMenuVisible}
                onDismiss={() => setCardMenuVisible(false)}
                anchor={
                  <TouchableOpacity onPress={() => setCardMenuVisible(true)}>
                    <TextInput
                      mode="outlined"
                      label="Select Payment Card"
                      value={selectedPaymentCard ? formatCardNumber(selectedPaymentCard.cardNumber) : ""}
                      editable={false}
                    />
                  </TouchableOpacity>
                }
              >
                {paymentCards.map((card) => (
                  <Menu.Item
                    key={card.id}
                    onPress={() => {
                      setSelectedPaymentCard(card);
                      setCardMenuVisible(false);
                    }}
                    title={formatCardNumber(card.cardNumber)}
                  />
                ))}
              </Menu>

              <View style={styles.buttonContainer}>
                <Button mode="contained" style={styles.greyButton} onPress={handleConfirmAddValue}>
                  Confirm
                </Button>
                <Button
                  mode="contained"
                  style={styles.greyButton}
                  onPress={() => {
                    setShowAddValueCard(false);
                    setShowBagunca(true);
                  }}
                >
                  Cancel
                </Button>
              </View>
            </Card.Content>
          </Card>
)}

      {/* Container para os cartões */}
      {showBagunca && (
          <Card style={styles.cardContainer}>
            <Card.Content>
              <Text style={styles.cardTitle}>Manage Cards</Text>
              <Text>Please select the Card you would like to manage:</Text>
              <Text style={styles.sectionTitle}>The following Cards are registered to this account:</Text>
              
              {/* Tabela de cartões */}
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>Card Name</Text>
                <Text style={styles.tableHeaderText}>Serial Number</Text>
                <Text style={styles.tableHeaderText}>Balance</Text>
              </View>
              
              {busPasses.map((card, index) => (
  <View key={card.id} style={styles.tableRow}>
    <RadioButton
      value={card.cardName}
      status={selectedCard === card.cardName ? 'checked' : 'unchecked'}
      onPress={() => setSelectedCard(card.cardName)}
    />
    <Text style={styles.tableText}>{card.cardName}</Text>
    <Text style={styles.tableText}>{card.cardSerial}</Text>
    <Text style={styles.tableText}>{card.balance}</Text>
  </View>
))}
  {/* Botões Add Value e Delete Card */}
  <View style={styles.buttonContainer}>
                <Button 
                  mode="contained" 
                  style={styles.greyButton}
                  textColor="white"
                  disabled={!selectedCard}
                  onPress={() => {setShowAddValueCard(true)
                    setShowBagunca(false)
                  }}
                >
                  Add Value
                </Button>
                


                <Button 
                  mode="contained" 
                  style={styles.greyButton}
                  textColor="white"
                  disabled={!selectedCard}
                  onPress={handleDeleteCard}
                >
                  Delete Card
                </Button>
              </View>

            </Card.Content>
          </Card>
        )}
        
        <Button 
          mode="contained" 
          onPress={() => setShowPassManager(!showPassManager)} 
          style={styles.button}
          buttonColor="#0fa261" 
          icon={() => (
            <Ionicons 
              name={showPassManager ? "remove" : "add"} 
              size={20} 
              color="white" 
            />
          )}
        >
          Add Buspass                            
        </Button>


        {showPassManager && (
          <Card style={styles.cardContainer}>
            <Card.Content>
              <Text style={styles.cardTitle}>Add a Buspass To Your Account</Text>
              <Text>Enter new Buspass information to add Buspass to your account</Text>
              
              <Text style={styles.sectionTitle}>Your Buspass Information</Text>
              
              <TextInput
                label="Card Serial Number"
                value={cardSerial}
                onChangeText={setCardSerial}
                mode="outlined"
                style={styles.input}
                right={<TextInput.Icon icon="help-circle-outline" />}
              />
              <TextInput
                label="Re-Type Card Serial Number"
                value={reTypeCardSerial}
                onChangeText={setReTypeCardSerial}
                mode="outlined"
                style={styles.input}
              />
              <TextInput
                label="Card Name (e.g. 'Mom's card')"
                value={cardName}
                onChangeText={setCardName}
                mode="outlined"
                style={styles.input}
              />
                {/* Botões Add Value e Delete Card */}
  <View style={styles.buttonContainer}>
                <Button 
                  mode="contained" 
                  style={styles.greyButton}
                  textColor="white"
                 
                  onPress={handleSavePass}
                >
                  Save pass
                </Button>
                <Button 
                  mode="contained" 
                  style={styles.greyButton}
                  textColor="white"
                  
                  onPress={clearFields}
                >
                  Clear fields
                </Button>
              </View>
            </Card.Content>
          </Card>
        )}
        {/* Botão Bagunca */}
        <Button 
          mode="contained" 
          onPress={() => setPlanTrip(!planTrip)} 
          style={styles.button}
          buttonColor="#f3922c"
          icon={() => (
            <Ionicons 
              name={planTrip ? "remove" : "add"} 
              size={20} 
              color="white" 
            />
          )}
        >
          Plan your trip 
        </Button>
        {planTrip && (
          <Card style={styles.cardContainer}>
            <Card.Content>
            <Image source={require("../assets/cs2.png")} style={styles.cs1} />

            </Card.Content>
          </Card>
        )}
<Button 
          mode="contained" 
          onPress={() => setFares(!fares)} 
          style={styles.button}
          
          icon={() => (
            <Ionicons 
              name={fares ? "remove" : "add"} 
              size={20} 
              color="white" 
            />
          )}
        >
          Fares & Prices
        </Button>
        {fares && (
          <Card style={styles.cardContainer}>
            <Card.Content>
            <Image source={require("../assets/fare.png")} style={styles.fares} />

            </Card.Content>
          </Card>
        )}
        <Button mode="contained" onPress={handleLogout} style={[styles.button, { marginTop: 200 }]} buttonColor="red">
          Logout
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

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
  button: {
    marginTop: 10,
  },
  cardContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    marginBottom: 10,
  },
  cardItem: {
    marginBottom: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 5,
  },
  tableHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    width: "30%",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  tableText: {
    fontSize: 14,
    width: "30%",
  },
  greyButton: {
    backgroundColor: "#A9A9A9",
    width: 140,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 0, // bordas quadradas
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  cs1:{
    width: 320,
    height: 320,
    alignSelf: "center",
    
  },
  fares:{
    width: 400,
    height: 185,
    alignSelf: "center",
    resizeMode:"contain"
  },
});

export default HomeScreen;




