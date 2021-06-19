import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Container, Text, useTheme } from "../../theme/theme";
import { HeaderRightContainer } from "./Home";
import usePosition from "../../components/usePosition";

function TownLife() {
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
      <Text>TownLife Screen</Text>
    </Container>
  );
}

export default TownLife;
