import React from "react";
import { RouteProp, useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { LoggedInNavParamList } from "../../../navigators/LoggedInNav";
import { View, FatText, Text } from "../../../theme/theme";
import instance, { logUserOut, TOKEN } from "../../../../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

interface IUserDrop {
  route: RouteProp<LoggedInNavParamList, "UserDrop">;
}

interface IUserDropBtn {
  drop?: boolean;
}

interface IUserDropBtnText {
  drop?: boolean;
}

const UserDropView = styled(View)`
  padding: 30px 10px;
`;

const UserDropFatText = styled(FatText)`
  font-size: 18px;
`;

const UserDropText = styled(Text)`
  margin-top: 20px;
  line-height: 25px;
`;

const DropContainer = styled.View`
  margin-top: 50px;
`;

const ButtonContainer = styled.View`
  margin-top: 20px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const UserDropBtn = styled.TouchableOpacity<IUserDropBtn>`
  width: 48.5%;
  border-width: ${(props) => (props.drop ? 0 : 1)}px;
  border-color: ${(props) => props.theme.theme.borderColor};
  border-radius: 5px;
  background-color: ${(props) =>
    props.drop ? "tomato" : props.theme.theme.bgColor};
`;

const UserDropBtnText = styled.Text<IUserDropBtnText>`
  padding: 15px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.drop ? "white" : props.theme.theme.textColor)};
`;

function UserDrop({ route }: IUserDrop) {
  const navigation = useNavigation();
  const memberId = route.params?.memberId;
  const nickname = route.params?.nickname;

  const dropAlert = () =>
    Alert.alert("계정삭제", "정말 계정을 삭제 하시겠나요?", [
      { text: "닫기", style: "cancel" },
      {
        text: "삭제하기",
        onPress: () => onDropPress(),
      },
    ]);

  const onDropPress = async () => {
    const token = await AsyncStorage.getItem(TOKEN);
    instance
      .delete(`/members/${memberId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        const memberId = response?.data;

        if (memberId) {
          logUserOut();
          Alert.alert("포도마켓을 이용해주셔서 감사합니다.");
        }
      })
      .catch((error) => {
        console.log("⚠️", error);
      });
  };

  return (
    <UserDropView>
      <UserDropFatText>
        ... {nickname}님과 이별인가요? 너무 아쉬워요.
      </UserDropFatText>
      <UserDropText>
        계정을 삭제하면 매너온도, 게시글, 관심, 채팅 등 모든 활동 정보가
        삭제됩니다. 계정 삭제 후 7일간 다시 가입할 수 없어요.
      </UserDropText>
      <DropContainer>
        <UserDropFatText>정말 계정을 삭제하시겠어요?</UserDropFatText>
        <ButtonContainer>
          <UserDropBtn onPress={() => navigation.navigate("Setting")}>
            <UserDropBtnText>더 사용해볼래요</UserDropBtnText>
          </UserDropBtn>
          <UserDropBtn drop onPress={dropAlert}>
            <UserDropBtnText drop>네, 삭제할게요</UserDropBtnText>
          </UserDropBtn>
        </ButtonContainer>
      </DropContainer>
    </UserDropView>
  );
}

export default UserDrop;
