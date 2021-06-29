import { RouteProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import { logUserOut } from "../../../../axios";
import { StackNavFactoryParamList } from "../../../navigators/StackNavFactory";
import { FatText, Text } from "../../../theme/theme";

interface ISetting {
  route: RouteProp<StackNavFactoryParamList, "Setting">;
}

const ScrollView = styled.ScrollView`
  background-color: ${(props) => props.theme.theme.bgColor};
`;

const Section = styled.View`
  border-top-width: 1px;
  border-top-color: ${(props) => props.theme.theme.borderColor};
  padding: 20px 10px;
`;

const SectionTitle = styled(FatText)`
  font-size: 13px;
`;

const SectionContent = styled.View`
  padding: 10px 0;
`;

const SectionList = styled.TouchableOpacity``;

const SectionListText = styled(Text)`
  padding: 20px 0;
`;

function Setting({ route }: ISetting) {
  const memberId = route.params?.memberId;
  const nickname = route.params?.nickname;

  const navigation = useNavigation();
  const logOutAlert = () =>
    Alert.alert("로그아웃", "정말 로그아웃 하시겠나요?", [
      { text: "닫기", style: "cancel" },
      {
        text: "로그아웃",
        onPress: () => logUserOut(),
      },
    ]);

  return (
    <ScrollView>
      <Section>
        <SectionTitle>기타</SectionTitle>
        <SectionContent>
          <SectionList onPress={logOutAlert}>
            <SectionListText>로그아웃</SectionListText>
          </SectionList>
          <SectionList
            onPress={() =>
              navigation.navigate("UserDrop", { memberId, nickname })
            }
          >
            <SectionListText>탈퇴하기</SectionListText>
          </SectionList>
        </SectionContent>
      </Section>
    </ScrollView>
  );
}

export default Setting;
