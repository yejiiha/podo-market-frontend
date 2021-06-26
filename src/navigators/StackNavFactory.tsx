import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useTheme } from "../theme/theme";
import Home from "../screen/LoggedIn/Home";
import TownLife from "../screen/LoggedIn/TownLife";
import Chat from "../screen/LoggedIn/Chat";
import MyPodo from "../screen/LoggedIn/MyPodo";
import Setting from "../screen/LoggedIn/MyPodo/Setting";
import Profile from "../screen/LoggedIn/MyPodo/Profile";
import EditProfile from "../screen/LoggedIn/MyPodo/EditProfile";

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
  Profile: {
    location: string;
    nickname: string;
    createdDate: string;
  };
  Setting: undefined;
  EditProfile: {
    nickname: string;
  };
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
        headerBackTitleVisible: false,
      }}
    >
      {screenName === "Home" && (
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitleStyle: {
              fontSize: 19,
            },
          }}
        />
      )}
      {screenName === "TownLife" && (
        <Stack.Screen
          name="TownLife"
          component={TownLife}
          options={{
            headerTitleStyle: {
              fontSize: 19,
            },
          }}
        />
      )}
      {screenName === "Chat" && (
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{
            headerTitle: "채팅",
            headerTitleStyle: {
              fontSize: 19,
            },
          }}
        />
      )}
      {screenName === "MyPodo" && (
        <Stack.Screen
          name="MyPodo"
          component={MyPodo}
          options={{
            headerTitle: "나의 포도",
            headerTitleStyle: {
              fontSize: 19,
            },
            headerStyle: {
              shadowOpacity: 0,
              backgroundColor: theme.theme.bgColor,
            },
          }}
        />
      )}
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{ title: "설정", headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "프로필",
          headerTitleAlign: "center",
          headerStyle: {
            shadowOpacity: 0,
            backgroundColor: theme.theme.bgColor,
          },
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          title: "프로필 수정",
          headerTitleAlign: "center",
          headerStyle: {
            shadowOpacity: 0,
            backgroundColor: theme.theme.bgColor,
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default StackNavFactory;
