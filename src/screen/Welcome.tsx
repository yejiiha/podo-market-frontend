import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import styled from "styled-components/native";
import { Container, Text } from "../theme/theme";
import { LoggedOutStackNavParamList } from "../navigators/LoggedOutNav";
import Button from "../components/Button";

type WelcomeNavigationProp = StackNavigationProp<
  LoggedOutStackNavParamList,
  "Welcome"
>;

type Props = {
  navigation: WelcomeNavigationProp;
};

const WelcomeContainer = styled(Container)`
  padding: 10px;
  justify-content: space-around;
`;

const Row = styled.View`
  width: 100%;
  align-items: center;
`;

const Logo = styled.Image`
  max-width: 50%;
  width: 100%;
  height: 100px;
  margin: 0 auto;
  margin-bottom: 30px;
`;

const SubTitle = styled(Text)`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const SubTitle2 = styled(Text)`
  margin-bottom: 130px;
`;

function Welcome({ navigation }: Props) {
  return (
    <WelcomeContainer>
      <Row>
        <Logo
          resizeMode="contain"
          source={require("../../assets/podo-market-logo.png")}
        />
        <SubTitle>우리 동네 중고 직거래 포도마켓</SubTitle>
        <SubTitle2>
          포도마켓은 동네 직거래 마켓이에요. {"\n"}내 동네를 설정하고
          시작해보세요!
        </SubTitle2>
      </Row>
      <Row>
        <Button
          text="둘러보기"
          onPress={() => navigation.navigate("Home")}
          isBorder
        />
        <Button
          text="로그인하기"
          onPress={() => navigation.navigate("LogIn")}
        />
        <Button
          text="회원가입하기"
          onPress={() => navigation.navigate("SignUp")}
          isBorder
        />
      </Row>
    </WelcomeContainer>
  );
}

export default Welcome;
