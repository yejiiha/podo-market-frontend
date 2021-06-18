import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screen/Welcome";
import Home from "../screen/Home";
import SignUp from "../screen/SignUp";
import LogIn from "../screen/LogIn";
import { useTheme } from "../theme/theme";

export type LoggedOutStackNavParamList = {
  Welcome: undefined;
  Home: undefined;
  LogIn?: {
    phoneNumber?: any;
  };
  SignUp: undefined;
};

function LoggedOutNav() {
  const LoggedOutStack = createStackNavigator<LoggedOutStackNavParamList>();
  const theme = useTheme();
  return (
    <LoggedOutStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.theme.bgColor,
        },
        headerTintColor: theme.theme.textColor,
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerTitle: "",
      }}
    >
      <LoggedOutStack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <LoggedOutStack.Screen name="Home" component={Home} />
      <LoggedOutStack.Screen
        name="LogIn"
        component={LogIn}
        options={{
          headerTitle: "로그인",
        }}
      />
      <LoggedOutStack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerTitle: "회원가입",
        }}
      />
    </LoggedOutStack.Navigator>
  );
}

export default LoggedOutNav;
