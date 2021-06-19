import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import styled from "styled-components/native";
import { FatText } from "../../theme/theme";
import Button from "../../components/Button";
import { LoggedOutStackNavParamList } from "../../navigators/LoggedOutNav";
import { WelcomeContainer, Row } from "./Welcome";
import usePosition from "../../components/usePosition";

type PositionNavigationProp = StackNavigationProp<
  LoggedOutStackNavParamList,
  "Position"
>;

type Props = {
  navigation: PositionNavigationProp;
};

const LocationText = styled(FatText)`
  font-size: 18px;
  margin-bottom: 120px;
`;

function Position({ navigation }: Props) {
  const {
    data: { dong, location },
  } = usePosition();

  return (
    <WelcomeContainer>
      <Row>
        <LocationText>{location}</LocationText>
      </Row>
      <Row>
        <Button
          text="둘러보기"
          onPress={() => navigation.navigate("Home", { dong })}
          isGray
        />
        <Button
          text="로그인하기"
          onPress={() => navigation.navigate("LogIn", { location })}
        />
        <Button
          text="회원가입하기"
          onPress={() => navigation.navigate("SignUp", { location })}
          isBorder
        />
      </Row>
    </WelcomeContainer>
  );
}

export default Position;
