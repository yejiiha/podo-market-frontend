import React, { useState, useEffect, useRef } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import styled from "styled-components/native";
import { useForm } from "react-hook-form";
import { TextInput as Input } from "react-native";
import { FatText, Text, TextInput, useTheme } from "../theme/theme";
import { LoggedOutStackNavParamList } from "../navigators/LoggedOutNav";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import AuthLayout from "../components/AuthLayout";
import { RouteProp } from "@react-navigation/native";

type LogInNavigationProp = StackNavigationProp<
  LoggedOutStackNavParamList,
  "LogIn"
>;
type LogInRouteProp = RouteProp<LoggedOutStackNavParamList, "LogIn">;
type Props = {
  navigation: LogInNavigationProp;
  route: LogInRouteProp;
};

const LoginHeader = styled.View`
  flex-direction: row;
  margin-bottom: 50px;
  align-items: center;
`;

const LoginImoji = styled.Text`
  font-size: 70px;
  margin-right: 20px;
`;

const TextContainer = styled.View`
  flex-direction: column;
`;

export const NavigationBtn = styled.TouchableOpacity`
  margin-top: 20px;
  align-items: center;
`;

function LogIn({ navigation, route }: Props) {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phoneNumber: route?.params?.phoneNumber,
    },
  });

  const phoneNumberRef = useRef<Input>(null);

  const onValid = (data: any) => {
    console.log(data);
  };

  useEffect(() => {
    register("phoneNumber", {
      minLength: {
        value: 11,
        message: "전화번호는 최소 11글자 이상 입력되어야 합니다.",
      },
    });
  }, [register]);

  return (
    <AuthLayout>
      <LoginHeader>
        <LoginImoji>🔒</LoginImoji>
        <TextContainer>
          <Text style={{ marginBottom: 5 }}>
            당근마켓은 휴대폰 번호로 가입 해요.{" "}
          </Text>
          <Text style={{ marginBottom: 5 }}>
            번호는 <FatText> 안전하게 보관 </FatText>되며
          </Text>
          <Text style={{ marginBottom: 5 }}>어디에도 공개되지 않아요.</Text>
        </TextContainer>
      </LoginHeader>

      <TextInput
        placeholder="휴대폰 번호(- 없이 숫자만 입력)"
        ref={phoneNumberRef}
        keyboardType="numeric"
        onChangeText={(text) => setValue("phoneNumber", text)}
        value={watch("phoneNumber")}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={
          isFocused
            ? { borderColor: theme.theme.textColor }
            : { borderColor: theme.theme.borderColor }
        }
      />
      <ErrorMessage message={errors?.phoneNumber?.message} />

      <Button
        text="인증문자 받기"
        onPress={handleSubmit(onValid)}
        disabled={!watch("phoneNumber")}
      />

      <NavigationBtn onPress={() => navigation.navigate("SignUp")}>
        <Text>
          계정이 없나요? <FatText>회원가입으로 이동</FatText>
        </Text>
      </NavigationBtn>
    </AuthLayout>
  );
}

export default LogIn;
