import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HighscoreScreen() {
  const [highscore, setHighscore] = useState(0);

  useEffect(() => {
    // Hämta högsta poäng från AsyncStorage när skärmen laddas
    const fetchHighscore = async () => {
      try {
        const storedHighscore = await AsyncStorage.getItem("highscore");
        if (storedHighscore !== null) {
          setHighscore(parseInt(storedHighscore));
        }
      } catch (e) {
        console.error("Failed to load highscore:", e);
      }
    };

    fetchHighscore();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Högsta poäng</Text>
      <Text style={styles.score}>{highscore}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Centrera både vertikalt och horisontellt
    alignItems: "center", // Centrera horisontellt
    backgroundColor: "#c086e2", // Bakgrundsfärg för hela skärmen
  },
  title: {
    fontSize: 36, // Större rubrik
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  score: {
    fontSize: 100, // Stor poängtext för att ta mest plats
    fontWeight: "bold",
    textAlign: "center",
  },
});
