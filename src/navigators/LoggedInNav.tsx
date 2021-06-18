import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screen/Home";

function LoggedInNav() {
  const LoggeInStack = createStackNavigator();
  return (
    <LoggeInStack.Navigator>
      <LoggeInStack.Screen name="Home" component={Home} />
    </LoggeInStack.Navigator>
  );
}

export default LoggedInNav;
