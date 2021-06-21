import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screen/LoggedOut/Welcome";
import Home from "../screen/LoggedOut/Home";
import SignUp from "../screen/LoggedOut/SignUp";
import LogIn from "../screen/LoggedOut/LogIn";
import { useTheme } from "../theme/theme";
import Position from "../screen/LoggedOut/Position";
import SearchNav from "./SearchNav";
import Category from "../screen/LoggedIn/Category";

export type LoggedOutStackNavParamList = {
  Welcome: undefined;
  Position: undefined;
  Home?: {
    dong?: string;
  };
  LogIn?: {
    phoneNumber?: string;
    location?: string;
    username?: string;
  };
  SignUp?: {
    location?: string;
  };
  SearchNav: undefined;
  Category: undefined;
};

function LoggedOutNav() {
  const LoggedOutStack = createStackNavigator<LoggedOutStackNavParamList>();
  const theme = useTheme();
  return (
    <LoggedOutStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.theme.bgColor,
          shadowOpacity: 0.3,
        },
        headerTintColor: theme.theme.textColor,
        headerBackTitleVisible: false,
        headerTitle: "",
      }}
    >
      <LoggedOutStack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <LoggedOutStack.Screen
        name="Position"
        component={Position}
        options={{
          headerTitle: "내 동네 설정하기",
        }}
      />
      <LoggedOutStack.Screen
        name="Home"
        component={Home}
        options={{ headerTitleAlign: "left" }}
      />
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
      <LoggedOutStack.Screen name="SearchNav" component={SearchNav} />
      <LoggedOutStack.Screen
        name="Category"
        component={Category}
        options={{ headerTitle: "카테고리" }}
      />
    </LoggedOutStack.Navigator>
  );
}

export default LoggedOutNav;
