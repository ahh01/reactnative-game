import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}> Minesweeper</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Minesweeper")}
      >
        <Text style={styles.buttonText}>Spela</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Highscore")}
      >
        <Text style={styles.buttonText}> Highscore</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Centrerar innehållet vertikalt
    alignItems: "center", // Centrerar innehållet horisontellt
    backgroundColor: "#c086e2",
  },
  h1: {
    fontSize: 42, // Stor rubrik, motsvarande H1
    fontWeight: "bold", // Fet stil
    marginBottom: 60, // Ökat avstånd mellan rubriken och knapparna
    textAlign: "center", // Centrerad text
   
    marginTop: -100, // Flyttar rubriken högre upp på sidan
  },
  button: {
    backgroundColor: "orange",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10, // Ger rundade hörn
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 180,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
