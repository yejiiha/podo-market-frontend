import { NavigationProp, RouteProp } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";
import { StackNavFactoryParamList } from "../../../navigators/StackNavFactory";
import { Text } from "../../../theme/theme";
import {
  Avatar,
  BtnText,
  Dong,
  GoToProfileBtn,
  UserContainer,
  Username,
  UsernameContainer,
} from "../MyPodo";

interface IProfile {
  navigation: NavigationProp<StackNavFactoryParamList, "Profile">;
  route: RouteProp<StackNavFactoryParamList, "Profile">;
}

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.theme.bgColor};
`;

const ProfileContainer = styled.View`
  padding: 10px;
  width: 100%;
  height: 340px;
`;

const UserAvatar = styled(Avatar)`
  width: 75px;
  height: 75px;
  border-radius: 40px;
`;

const GoToProfileEditBtn = styled(GoToProfileBtn)`
  padding: 10px;
`;

const MannerTempContainer = styled.View`
  padding: 20px 0;
`;

const MannerTempText = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  text-decoration-line: underline;
`;

const LocationCreatedContaienr = styled.View`
  padding: 20px 10px;
  background-color: ${(props) => props.theme.theme.formColor};
`;

const LocationCreatedText = styled.Text`
  color: ${(props) => props.theme.theme.darkGray};
  font-size: 13px;
`;

const LocationCreatedFatText = styled(LocationCreatedText)`
  font-weight: 600;
`;

function Profile({ navigation, route }: IProfile) {
  const nickname = route.params.nickname;
  const createdDate = route.params.createdDate;
  const location = route.params.location;
  const memberId = route.params.memberId;

  const getDate = (createdDate: string) => {
    const year = createdDate.substring(0, 4);
    const month = createdDate.substring(5, 7);
    const day = createdDate.substring(8, 10);

    return {
      year,
      month,
      day,
    };
  };

  return (
    <Container>
      <ProfileContainer>
        <UserContainer>
          <UserAvatar source={require("../../../../assets/user-icon.png")} />
          <UsernameContainer>
            <Username>{nickname}</Username>
            <Dong>#1232</Dong>
          </UsernameContainer>
        </UserContainer>
        <GoToProfileEditBtn
          onPress={() =>
            navigation.navigate("EditProfile", {
              nickname,
              memberId,
            })
          }
        >
          <BtnText>프로필 수정</BtnText>
        </GoToProfileEditBtn>
        <MannerTempContainer>
          <MannerTempText>매너온도</MannerTempText>
        </MannerTempContainer>
      </ProfileContainer>
      <LocationCreatedContaienr>
        <LocationCreatedText>
          <LocationCreatedFatText>{location}</LocationCreatedFatText> 인증
        </LocationCreatedText>
        <LocationCreatedText>
          {getDate(createdDate).year}년 {getDate(createdDate).month}월{" "}
          {getDate(createdDate).day}일 가입
        </LocationCreatedText>
      </LocationCreatedContaienr>
    </Container>
  );
}

export default Profile;
