import React, { ReactNode } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import styled from "styled-components/native";
import { DismissKeyboard } from "./DismissKeyboard";
import { Container } from "../theme/theme";

interface IAuthLayout {
  children: ReactNode;
}

const AuthContainer = styled(Container)`
  padding: 10px;
`;

export default function AuthLayout({ children }: IAuthLayout) {
  return (
    <DismissKeyboard>
      <AuthContainer>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
          style={{
            width: "100%",
          }}
        >
          {children}
        </KeyboardAvoidingView>
      </AuthContainer>
    </DismissKeyboard>
  );
}
