import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNav from "./TabsNav";
import SearchNav from "./SearchNav";
import Category from "../screen/LoggedIn/Category";
import Notification from "../screen/LoggedIn/Notification";
import { useTheme } from "../theme/theme";

export type LoggedInMainNavParamList = {
  TabsNav: undefined;
  SearchNav: undefined;
  Category: undefined;
  Notification: undefined;
};

function LoggedInMainNav() {
  const LoggeInStack = createStackNavigator<LoggedInMainNavParamList>();
  const theme = useTheme();

  return (
    <LoggeInStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: theme.theme.bgColor,
        },
        headerTintColor: theme.theme.textColor,
      }}
    >
      <LoggeInStack.Screen
        name="TabsNav"
        component={TabsNav}
        options={{ headerShown: false }}
      />
      <LoggeInStack.Screen
        name="SearchNav"
        component={SearchNav}
        options={{
          headerStyle: {
            shadowOpacity: 0,
            backgroundColor: theme.theme.bgColor,
          },
        }}
      />
      <LoggeInStack.Screen
        name="Category"
        component={Category}
        options={{ title: "카테고리" }}
      />
      <LoggeInStack.Screen
        name="Notification"
        component={Notification}
        options={{ title: "알림" }}
      />
    </LoggeInStack.Navigator>
  );
}

export default LoggedInMainNav;
