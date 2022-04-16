import 'react-native-gesture-handler';

import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AccessMenu from "./Screens/AccessMenu";
import MainMenu from './Screens/MainMenu'
import Lists from './Screens/Lists';

const Stack = createStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="AccessMenu">
        <Stack.Screen
          name="AccessMenu"
          component={AccessMenu}
          
        />
        <Stack.Screen 
          name="MainMenu"
          component={MainMenu}
        />
        <Stack.Screen 
          name="Lists"
          component={Lists}
        />
      </Stack.Navigator>
    </NavigationContainer>



  );
}

const styles = StyleSheet.create({
  container: {
    top: 45,
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#202620",
    alignItems: "center",
    justifyContent: "space-between",
  },

  butRegistrar: {
    alignItems: "center",
    backgroundColor: "#C4C4C4",
    borderRadius: 5,
    width: 150,
    height: 40,
  },

  butTengo: {
    width: 150,
    height: 40,
    alignItems: "center",
    backgroundColor: "#C4C4C4",
    borderRadius: 5

  },
  logo: {
    top: 30,
    width: 150,
    height: 150,
  },

  textPrivacidad: {
    bottom: 50,
    color: "#C4C4C4",

  },
  textTitle: {
    top: 32,
    color: "#C4C4C4",
    fontSize: 40,
    fontWeight: "bold",
  },
});
