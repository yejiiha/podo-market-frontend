import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EditProfile from "../screen/LoggedIn/MyPodo/EditProfile";
import Profile from "../screen/LoggedIn/MyPodo/Profile";

function ProfileNav() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ title: "프로필" }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ title: "프로필 수정" }}
      />
    </Stack.Navigator>
  );
}

export default ProfileNav;
