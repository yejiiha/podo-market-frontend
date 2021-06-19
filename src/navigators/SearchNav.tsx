import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import styled from "styled-components/native";
import { useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/theme";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SearchItem from "../screen/LoggedIn/Search/SearchItem";
import SearchUser from "../screen/LoggedIn/Search/SearchUser";
import SearchTown from "../screen/LoggedIn/Search/SearchTown";

type InputProps = {
  width: number;
};

const InputContainer = styled.View`
  padding: 7px 8px;
  flex-direction: row;
  align-items: center;
  margin-left: 20px;
  background-color: ${(props) => props.theme.theme.borderColor};
  border-radius: 10px;
`;

const Input = styled.TextInput<InputProps>`
  color: ${(props) => props.theme.theme.textColor};
  width: ${(props) => props.width / 1.3}px;
  padding-left: 8px;
  font-size: 16px;
`;

function SearchNav() {
  const theme = useTheme();
  const SearchTab = createMaterialTopTabNavigator();
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const { register, setValue, handleSubmit } = useForm();
  const onValid = (data: any) => {
    console.log(data);
  };
  const SearchBox = () => (
    <InputContainer>
      <Ionicons name="search" size={20} color={theme.theme.darkGray} />
      <Input
        width={width}
        placeholder="검색어를 입력하세요."
        autoCapitalize="none"
        returnKeyLabel="Search"
        returnKeyType="search"
        onChangeText={(text) => setValue("keyword", text)}
        autoCorrect={false}
        onSubmitEditing={handleSubmit(onValid)}
      />
    </InputContainer>
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register("keyword", { required: true, minLength: 2 });
  }, []);
  return (
    <SearchTab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: theme.theme.bgColor,
          height: 40,
        },
        activeTintColor: theme.theme.textColor,
        indicatorStyle: {
          backgroundColor: theme.theme.textColor,
          bottom: 0,
        },
        labelStyle: {
          fontWeight: "600",
        },
        tabStyle: {
          paddingBottom: 20,
        },
      }}
    >
      <SearchTab.Screen
        name="SearchItem"
        component={SearchItem}
        options={{ title: "중고거래" }}
      />
      <SearchTab.Screen
        name="SearchTown"
        component={SearchTown}
        options={{ title: "동네정보" }}
      />
      <SearchTab.Screen
        name="SearchUser"
        component={SearchUser}
        options={{ title: "사람" }}
      />
    </SearchTab.Navigator>
  );
}

export default SearchNav;
