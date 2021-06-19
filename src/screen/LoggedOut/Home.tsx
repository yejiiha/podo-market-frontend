import React, { useEffect } from "react";
import { RouteProp } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Container, Text, useTheme } from "../../theme/theme";
import { StackNavigationProp } from "@react-navigation/stack";
import { LoggedOutStackNavParamList } from "../../navigators/LoggedOutNav";

type HomeNavigationProp = StackNavigationProp<
  LoggedOutStackNavParamList,
  "Home"
>;
type LogInRouteProp = RouteProp<LoggedOutStackNavParamList, "Home">;
type Props = {
  navigation: HomeNavigationProp;
  route: LogInRouteProp;
};

function Home({ navigation, route }: Props) {
  const theme = useTheme();
  console.log(route?.params?.dong);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `${route?.params?.dong}`,
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
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
        </View>
      ),
    });
  });
  return (
    <Container>
      <Text>LoggedOut Home Screen</Text>
    </Container>
  );
}

export default Home;
