import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import ItemUpload from "../screen/LoggedIn/ItemUpload/ItemUpload";
import ItemUploadCategory from "../screen/LoggedIn/ItemUpload/ItemUploadCategory";
import { useTheme } from "../theme/theme";

export type ItemUploadNavParamList = {
  ItemUpload: {
    localUri?: string;
    takenPhoto?: string;
  };
  ItemUploadCategory: any;
};

function ItemUploadNav() {
  const ItemStack = createStackNavigator<ItemUploadNavParamList>();
  const theme = useTheme();
  return (
    <ItemStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: theme.theme.bgColor,
        },
        headerTintColor: theme.theme.textColor,
      }}
    >
      <ItemStack.Screen
        name="ItemUpload"
        component={ItemUpload}
        options={{
          title: "중고거래 글쓰기",
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
      <ItemStack.Screen
        name="ItemUploadCategory"
        component={ItemUploadCategory}
        options={{
          title: "카테고리 선택",
        }}
      />
    </ItemStack.Navigator>
  );
}

export default ItemUploadNav;
