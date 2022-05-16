import { View, Text } from "react-native";
import React, { useContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccessMenu from "../Screens/AccessMenu";
import MainMenu from "../Screens/MainMenu";
import Lists from "../Screens/Lists";
import ProductList from "../Screens/ProductList";
import NameList from "../Screens/NameList";
import { AuthContext } from "../context/AuthContext";

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const { islogueado } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {islogueado ? (
          <>
            <Stack.Screen name="MainMenu" component={MainMenu} options={{ headerShown: false }} />
            <Stack.Screen name="ProductList" component={ProductList} options={{ title: 'Lista de Productos' }}/>
            <Stack.Screen name="Lists" component={Lists} options={{ title: 'Mi Listas' }} />
            <Stack.Screen name="NameList" component={NameList} />            
          </>
        ) : (
          <Stack.Screen
            name="AccessMenu"
            component={AccessMenu}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
