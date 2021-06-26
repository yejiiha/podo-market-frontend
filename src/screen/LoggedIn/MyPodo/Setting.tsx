import React from "react";
import { logUserOut } from "../../../../axios";
import Button from "../../../components/Button";
import { Container, Text } from "../../../theme/theme";

function Setting() {
  return (
    <Container>
      <Text>Setting Screen</Text>
      <Button text="로그아웃" onPress={() => logUserOut()} />
    </Container>
  );
}

export default Setting;
