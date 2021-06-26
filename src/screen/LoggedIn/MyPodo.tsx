import React, { useEffect } from "react";
import { NavigationProp } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome, SimpleLineIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { Text, useTheme } from "../../theme/theme";
import { useState } from "react";
import { StackNavFactoryParamList } from "../../navigators/StackNavFactory";
import instance, { TOKEN } from "../../../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IMyPodo {
  navigation: NavigationProp<StackNavFactoryParamList>;
}

const PodoContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.theme.bgColor};
`;

const ProfileContainer = styled.View`
  padding: 10px;
  width: 100%;
  height: 275px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.theme.borderColor};
`;

export const UserContainer = styled.View`
  padding-top: 15px;
  flex-direction: row;
  text-align: center;
  margin-bottom: 15px;
`;

export const Avatar = styled.Image`
  width: 65px;
  height: 65px;
  border-radius: 40px;
  border-width: 1px;
  border-color: ${(props) => props.theme.theme.borderColor};
`;

export const UsernameContainer = styled.View`
  height: 60px;
  margin-left: 20px;
  justify-content: center;
`;

export const Username = styled(Text)`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 5px;
`;

export const Dong = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.theme.darkGray};
`;

export const GoToProfileBtn = styled.TouchableOpacity`
  padding: 12px;
  border: 1px solid ${(props) => props.theme.theme.borderColor};
  border-radius: 6px;
  align-items: center;
`;

export const BtnText = styled.Text`
  color: ${(props) => props.theme.theme.textColor};
  font-size: 14px;
  font-weight: 600;
`;

const IconContainer = styled.View`
  padding: 20px 0;
  flex-direction: row;
  justify-content: space-around;
`;

const IconColumn = styled.TouchableOpacity``;

const IconWrapper = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${(props) => props.theme.theme.lightPodoColor};
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const IconLabel = styled(Text)`
  font-size: 14px;
  text-align: center;
`;

function MyPodo({ navigation }: IMyPodo) {
  const theme = useTheme();
  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [createdDate, setCreateDate] = useState("");
  const [location, setLocation] = useState("");

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem(TOKEN);
      return await instance.get(`/members/1`, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error) {
      console.log("⚠️", error);
    }
  };

  const processData = () => {
    getData().then((response) => {
      const data = response?.data;

      setNickname(data.nickname);
      setLocation(data.location);
      setCreateDate(data.createdDate);
    });
  };

  processData();

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
    <PodoContainer>
      <ProfileContainer>
        <UserContainer>
          <Avatar source={require("../../../assets/user-icon.png")} />
          <UsernameContainer>
            <Username>{nickname}</Username>
            <Dong>{location}</Dong>
          </UsernameContainer>
        </UserContainer>
        <GoToProfileBtn
          onPress={() =>
            navigation.navigate("Profile", {
              nickname,
              createdDate,
              location,
            })
          }
        >
          <BtnText>프로필 보기</BtnText>
        </GoToProfileBtn>
        <IconContainer>
          <IconColumn>
            <IconWrapper>
              <Ionicons
                name="document-text-outline"
                size={30}
                color="black"
                style={{ marginLeft: 5 }}
              />
            </IconWrapper>
            <IconLabel>판매내역</IconLabel>
          </IconColumn>
          <IconColumn>
            <IconWrapper>
              <SimpleLineIcons
                name="handbag"
                size={24}
                color="black"
                style={{ marginLeft: 1 }}
              />
            </IconWrapper>
            <IconLabel>구매내역</IconLabel>
          </IconColumn>
          <IconColumn>
            <IconWrapper>
              <Ionicons
                name="heart-outline"
                size={30}
                color="black"
                style={{ marginTop: 5 }}
              />
            </IconWrapper>
            <IconLabel>관심목록</IconLabel>
          </IconColumn>
        </IconContainer>
      </ProfileContainer>
    </PodoContainer>
  );
}

export default MyPodo;
