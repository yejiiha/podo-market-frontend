import React, { useState } from "react";
import { StatusBar, useColorScheme } from "react-native";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import AppLoading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";
import { AppearanceProvider } from "react-native-appearance";
import { ThemeProvider } from "styled-components";
import { NavigationContainer } from "@react-navigation/native";
import { darkTheme, lightTheme } from "./src/theme/theme";
import LoggedInNav from "./src/navigators/LoggedInNav";
import LoggedOutNav from "./src/navigators/LoggedOutNav";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar, TOKEN } from "./axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const mode = useColorScheme();
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const onFinish = () => setLoading(false);

  const preloadAssets = async () => {
    const fontToLoad = [Ionicons.font];
    const fontPromises = fontToLoad.map((font: any) => Font.loadAsync(font));
    const imageToLoad = [require("./assets/podo-market-logo.png")];
    const imagePromises = imageToLoad.map((image) => Asset.loadAsync(image));
    await Promise.all<any>([...fontPromises, ...imagePromises]);
  };

  const preload = async () => {
    const token = await AsyncStorage.getItem(TOKEN);
    if (token) {
      isLoggedInVar(true);
    }
    await preloadAssets;
  };

  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }

  return (
    <AppearanceProvider>
      <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
        <NavigationContainer>
          <StatusBar
            barStyle={mode === "light" ? "dark-content" : "light-content"}
          />
          {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
        </NavigationContainer>
      </ThemeProvider>
    </AppearanceProvider>
  );
}
