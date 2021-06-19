import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface ITabIcons {
  iconName: any;
  color: string;
  focused: boolean;
}

export default function TabIcon({ iconName, color, focused }: ITabIcons) {
  return (
    <Ionicons
      name={focused ? iconName : `${iconName}-outline`}
      color={color}
      size={24}
    />
  );
}
