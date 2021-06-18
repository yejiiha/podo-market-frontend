import React, { useState, useEffect, useRef } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import styled from "styled-components/native";
import { useForm } from "react-hook-form";
import { TextInput as Input } from "react-native";
import { FatText, Text, TextInput, useTheme } from "../../theme/theme";
import { LoggedOutStackNavParamList } from "../../navigators/LoggedOutNav";
import Button from "../../components/Button";
import ErrorMessage from "../../components/ErrorMessage";
import AuthLayout from "../../components/AuthLayout";
import { onNext } from "../../components/onNext";

type LogInNavigationProp = StackNavigationProp<
  LoggedOutStackNavParamList,
  "LogIn"
>;
type LogInRouteProp = RouteProp<LoggedOutStackNavParamList, "LogIn">;
type Props = {
  navigation: LogInNavigationProp;
  route: LogInRouteProp;
};

interface ILoginForm {
  location?: string;
  phoneNumber: string;
  verifyNumber?: string;
}

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

const VerifyContainer = styled.View`
  margin-top: 20px;
`;

const AuthText = styled.Text`
  color: ${(props) => props.theme.theme.darkGray};
  font-size: 12px;
`;

export const NavigationBtn = styled.TouchableOpacity`
  margin-top: 20px;
  align-items: center;
`;

function LogIn({ navigation, route }: Props) {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isVerifyFocused, setIsVerifiedFocus] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ILoginForm>({
    defaultValues: {
      phoneNumber: route?.params?.phoneNumber,
      location: route?.params?.location,
    },
  });

  const locationRef = useRef<Input>(null);
  const phoneNumberRef = useRef<Input>(null);
  const verifyNumberRef = useRef<Input>(null);

  const onValid = (data: any) => {
    setIsVerify(true);
    onNext(verifyNumberRef);
  };

  const onVerifyValid = (data: any) => {
    console.log(data);
  };

  useEffect(() => {
    register("phoneNumber", {
      minLength: {
        value: 11,
        message: "전화번호는 최소 11글자 이상 입력되어야 합니다.",
      },
    });
    register("verifyNumber", {
      minLength: {
        value: 4,
        message: "인증번호는 최소 4글자 이상 입력되어야 합니다.",
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
            번호는<FatText> 안전하게 보관 </FatText>되며
          </Text>
          <Text style={{ marginBottom: 5 }}>어디에도 공개되지 않아요.</Text>
        </TextContainer>
      </LoginHeader>

      <TextInput
        placeholder="내 동네"
        ref={locationRef}
        editable={false}
        onSubmitEditing={() => onNext(phoneNumberRef)}
        returnKeyType="next"
        onChangeText={(text) => setValue("location", text)}
        value={watch("location")}
      />

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
        isGray
      />

      {isVerify && (
        <VerifyContainer>
          <TextInput
            placeholder="인증번호 입력"
            ref={verifyNumberRef}
            keyboardType="numeric"
            onChangeText={(text) => setValue("verifyNumber", text)}
            value={watch("verifyNumber")}
            onFocus={() => setIsVerifiedFocus(true)}
            onBlur={() => setIsVerifiedFocus(false)}
            style={
              isVerifyFocused
                ? { borderColor: theme.theme.textColor }
                : { borderColor: theme.theme.borderColor }
            }
          />

          <ErrorMessage message={errors?.verifyNumber?.message} />
          <AuthText>어떤 경우에도 타인에게 공유하지 마세요!</AuthText>

          <Button
            text="인증문자 확인"
            onPress={handleSubmit(onVerifyValid)}
            disabled={!watch("verifyNumber")}
          />
        </VerifyContainer>
      )}

      <NavigationBtn
        onPress={() =>
          navigation.navigate("SignUp", { location: route?.params?.location })
        }
      >
        <Text>
          계정이 없나요? <FatText>회원가입으로 이동</FatText>
        </Text>
      </NavigationBtn>
    </AuthLayout>
  );
}

export default LogIn;
