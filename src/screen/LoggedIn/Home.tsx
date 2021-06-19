import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import styled from "styled-components/native";
import { Container, Text, useTheme } from "../../theme/theme";
import usePosition from "../../components/usePosition";

export const HeaderRightContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

function Home() {
  const navigation = useNavigation();
  const theme = useTheme();
  const {
    data: { dong },
  } = usePosition();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `${dong}`,
      headerRight: () => (
        <HeaderRightContainer>
          <TouchableOpacity
            style={{ marginRight: 13 }}
            onPress={() => navigation.navigate("SearchNav")}
          >
            <Ionicons name="search" size={25} color={theme.theme.textColor} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginRight: 13 }}
            onPress={() => navigation.navigate("Category")}
          >
            <Feather name="menu" size={25} color={theme.theme.textColor} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginRight: 20 }}
            onPress={() => navigation.navigate("Notification")}
          >
            <Feather name="bell" size={24} color={theme.theme.textColor} />
          </TouchableOpacity>
        </HeaderRightContainer>
      ),
    });
  });

  return (
    <Container>
      <Text>LoggedIn Home Screen</Text>
    </Container>
  );
}

export default Home;
