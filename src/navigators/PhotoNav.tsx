import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useTheme } from "../theme/theme";
import SelectPhoto from "../screen/LoggedIn/ItemUpload/Photo/SelectPhoto";
import TakePhoto from "../screen/LoggedIn/ItemUpload/Photo/TakePhoto";

type IPhotoNav = {
  Select: undefined;
  TakePhoto: undefined;
};

function PhotoNav() {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator<IPhotoNav>();
  const theme = useTheme();
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          position: "absolute",
          backgroundColor: theme.theme.bgColor,
          height: 50,
        },
        activeTintColor: theme.theme.podoColor,
      }}
    >
      <Tab.Screen
        name="Select"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="photo" size={24} color={color} />
          ),
        }}
      >
        {() => (
          <Stack.Navigator
            screenOptions={{
              headerTintColor: theme.theme.textColor,
              headerBackTitleVisible: false,
              headerBackImage: ({ tintColor }) => (
                <Ionicons color={tintColor} name="close" size={28} />
              ),
              headerStyle: {
                backgroundColor: theme.theme.bgColor,
                shadowOpacity: 0.3,
              },
            }}
          >
            <Stack.Screen
              name="SelectPhoto"
              options={{
                title: "New Post",
              }}
              component={SelectPhoto}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="TakePhoto"
        component={TakePhoto}
        options={{
          tabBarVisible: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="camera" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default PhotoNav;
