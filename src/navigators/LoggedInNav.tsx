import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/theme";
import ItemUploadNav from "./ItemUploadNav";
import PhotoNav from "./PhotoNav";
import LoggedInMainNav from "./LoggedInMainNav";
import UserDrop from "../screen/LoggedIn/MyPodo/UserDrop";

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
  UserDrop: {
    memberId: number;
    nickname: string;
  };
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
      <LoggeInStack.Screen
        name="PhotoNav"
        component={PhotoNav}
        options={{ headerShown: false }}
      />
      <LoggeInStack.Screen
        name="UserDrop"
        component={UserDrop}
        options={{
          title: "계정 삭제하기",
          headerBackImage: ({ tintColor }) => (
            <Ionicons
              color={tintColor}
              name="ios-close"
              size={30}
              style={{ paddingLeft: 8 }}
            />
          ),
        }}
      />
    </LoggeInStack.Navigator>
  );
}

export default LoggedInNav;
