import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "../theme/theme";
import TabIcon from "../components/TabIcon";
import StackNavFactory from "./StackNavFactory";

function TabsNav() {
  const Tabs = createBottomTabNavigator();
  const theme = useTheme();
  return (
    <Tabs.Navigator
      tabBarOptions={{
        tabStyle: {
          backgroundColor: theme.theme.bgColor,
        },
        activeTintColor: theme.theme.podoColor,
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName="home" color={color} focused={focused} />
          ),
          tabBarLabel: "홈",
        }}
      >
        {() => <StackNavFactory screenName="Home" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="TownLife"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              iconName="md-document-text"
              color={color}
              focused={focused}
            />
          ),
          tabBarLabel: "동네생활",
        }}
      >
        {() => <StackNavFactory screenName="TownLife" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Chat"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName="chatbubble" color={color} focused={focused} />
          ),
          tabBarLabel: "채팅",
        }}
      >
        {() => <StackNavFactory screenName="Chat" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="MyPodo"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName="person" color={color} focused={focused} />
          ),
          tabBarLabel: "나의 포도",
        }}
      >
        {() => <StackNavFactory screenName="MyPodo" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}

export default TabsNav;
