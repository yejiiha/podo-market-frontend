import React from "react";
import styled from "styled-components/native";

interface IErrorMessage {
  message?: string;
}

const SErrorMessage = styled.Text`
  color: tomato;
  font-weight: 600;
  font-size: 12px;
  margin-bottom: 8px;
`;

function ErrorMessage({ message }: IErrorMessage) {
  return message === "" || !message ? null : (
    <SErrorMessage>{message}</SErrorMessage>
  );
}

export default ErrorMessage;
