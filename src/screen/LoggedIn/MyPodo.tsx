import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Container, Text, useTheme } from "../../theme/theme";

function MyPodo() {
  const navigation = useNavigation();
  const theme = useTheme();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={() => navigation.navigate("Setting")}
        >
          <FontAwesome name="cog" size={25} color={theme.theme.textColor} />
        </TouchableOpacity>
      ),
    });
  });

  return (
    <Container>
      <Text>MyPodo Screen</Text>
    </Container>
  );
}

export default MyPodo;
