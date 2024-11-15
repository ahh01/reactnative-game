import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import MinesweeperScreen from "./screens/MinesweeperScreen";
import HighscoreScreen from "./screens/HighscoreScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#c086e2", // Bakgrundsfärg på header
          },
          headerTintColor: "#fff", // Färgen på texten i headern
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Minesweeper" component={MinesweeperScreen} />
        <Stack.Screen name="Highscore" component={HighscoreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
