import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const SButton = styled.TouchableOpacity<ISButton>`
  width: 100%;
  margin-top: 15px;
  padding: 15px 10px;
  border-radius: 10px;
  border: ${(props) =>
    props.isBorder ? `1px solid ${props.theme.theme.podoColor}` : "0px"};
  background-color: ${(props) =>
    props.isBorder ? props.theme.theme.bgColor : props.theme.theme.podoColor};
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;

const ButtonText = styled.Text<ISButton>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isBorder ? props.theme.theme.podoColor : "white")};
  text-align: center;
`;

interface IButton {
  onPress: () => void;
  text: string;
  disabled?: boolean;
  loading?: boolean;
  isBorder?: boolean;
}

interface ISButton {
  disabled?: boolean;
  isBorder?: boolean;
}

export default function Button({
  onPress,
  text,
  disabled,
  loading,
  isBorder,
}: IButton) {
  return (
    <SButton disabled={disabled} onPress={onPress} isBorder={isBorder}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <ButtonText isBorder={isBorder}>{text}</ButtonText>
      )}
    </SButton>
  );
}
