import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "../theme/theme";
import ItemUploadNav from "./ItemUploadNav";
import PhotoNav from "./PhotoNav";
import LoggedInMainNav from "./LoggedInMainNav";
import ItemUpload from "../screen/LoggedIn/ItemUpload/ItemUpload";

export type LoggedInNavParamList = {
  LoggedInMainNav: undefined;
  ItemUploadNav: {
    localUri?: string;
    takenPhoto?: string;
  };
  ItemUpload: {
    localUri?: string;
    takenPhoto?: string;
  };
  PhotoNav: undefined;
};

function LoggedInNav() {
  const LoggeInStack = createStackNavigator<LoggedInNavParamList>();
  const theme = useTheme();

  return (
    <LoggeInStack.Navigator
      mode="modal"
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: theme.theme.bgColor,
        },
        headerTintColor: theme.theme.textColor,
      }}
    >
      <LoggeInStack.Screen
        name="LoggedInMainNav"
        component={LoggedInMainNav}
        options={{ headerShown: false }}
      />
      <LoggeInStack.Screen
        name="ItemUploadNav"
        component={ItemUploadNav}
        options={{ headerShown: false }}
      />
      {/* <LoggeInStack.Screen
        name="ItemUpload"
        component={ItemUpload}
        options={{ headerShown: false }}
      /> */}
      <LoggeInStack.Screen
        name="PhotoNav"
        component={PhotoNav}
        options={{ headerShown: false }}
      />
    </LoggeInStack.Navigator>
  );
}

export default LoggedInNav;
