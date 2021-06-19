import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import Chat from "../screen/LoggedIn/Chat";
import Home from "../screen/LoggedIn/Home";
import MyPodo from "../screen/LoggedIn/MyPodo";
import TownLife from "../screen/LoggedIn/TownLife";
import { useTheme } from "../theme/theme";
import Setting from "../screen/LoggedIn/Setting";

interface IStackNavFactory {
  screenName: string;
}

export type StackNavFactoryParamList = {
  Home?: {
    dong?: string;
  };
  TownLife: undefined;
  Chat: undefined;
  MyPodo: undefined;
  Profile?: undefined;
  Setting: undefined;
};

function StackNavFactory({ screenName }: IStackNavFactory) {
  const Stack = createStackNavigator<StackNavFactoryParamList>();
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "left",
        headerTintColor: theme.theme.textColor,
        headerStyle: {
          backgroundColor: theme.theme.bgColor,
        },
        headerTitleStyle: {
          fontSize: 19,
        },
        headerBackTitleVisible: false,
      }}
    >
      {screenName === "Home" && <Stack.Screen name="Home" component={Home} />}
      {screenName === "TownLife" && (
        <Stack.Screen name="TownLife" component={TownLife} />
      )}
      {screenName === "Chat" && (
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{ headerTitle: "채팅" }}
        />
      )}
      {screenName === "MyPodo" && (
        <Stack.Screen
          name="MyPodo"
          component={MyPodo}
          options={{ headerTitle: "나의 포도" }}
        />
      )}
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{ title: "설정", headerTitleAlign: "center" }}
      />
    </Stack.Navigator>
  );
}

export default StackNavFactory;
