import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components/native";
import { TextInput as Input } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import AuthLayout from "../../components/AuthLayout";
import { FatText, Text, TextInput, useTheme } from "../../theme/theme";
import Button from "../../components/Button";
import { NavigationBtn } from "./LogIn";
import { LoggedOutStackNavParamList } from "../../navigators/LoggedOutNav";
import ErrorMessage from "../../components/ErrorMessage";
import { onNext } from "../../components/onNext";

type SignUpNavigationProp = StackNavigationProp<
  LoggedOutStackNavParamList,
  "SignUp"
>;
type SignUpRouteProp = RouteProp<LoggedOutStackNavParamList, "SignUp">;

type Props = {
  navigation: SignUpNavigationProp;
  route: SignUpRouteProp;
};

interface ISignUpForm {
  username: string;
  phoneNumber: string;
  location?: string;
  verifyNumber?: string;
}

const SignUpHeader = styled.View`
  flex-direction: row;
  margin-bottom: 50px;
  align-items: center;
`;

const SignUpImoji = styled.Text`
  font-size: 70px;
  margin-right: 20px;
`;

const TextContainer = styled.View`
  flex-direction: column;
`;

const VerifyContainer = styled.View`
  margin-top: 20px;
`;

const UsernameContainer = styled(VerifyContainer)``;

const AuthText = styled.Text`
  color: ${(props) => props.theme.theme.darkGray};
  font-size: 12px;
`;

function SignUp({ navigation, route }: Props) {
  const theme = useTheme();
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isNumberFocused, setIsNumberFocused] = useState(false);
  const [isVerifyFocused, setIsVerifiedFocus] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const [inputUsername, setInputUsername] = useState(false);

  console.log(isVerify);

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ISignUpForm>({
    defaultValues: {
      location: route?.params?.location,
    },
  });

  const locationRef = useRef<Input>(null);
  const usernameRef = useRef<Input>(null);
  const phoneNumberRef = useRef<Input>(null);
  const verifyNumberRef = useRef<Input>(null);

  const receiveAuthMessage = () => {
    setIsVerify(true);
    onNext(verifyNumberRef);
  };

  const checkVerifyMessage = () => {
    setInputUsername(true);
    onNext(usernameRef);
  };

  const onValid = (data: any) => {
    const { location, username, phoneNumber } = data;
    console.log(location, username, phoneNumber);
    navigation.navigate("LogIn", {
      phoneNumber,
      location,
      username,
    });
  };

  useEffect(() => {
    register("phoneNumber", {
      required: "번호는 필수 사항입니다.",
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
    register("username", {
      minLength: {
        value: 2,
        message: "닉네임은 최소 2글자 이상 입력되어야 합니다.",
      },
    });
  }, [register]);

  return (
    <AuthLayout>
      <SignUpHeader>
        <SignUpImoji>🔒</SignUpImoji>
        <TextContainer>
          <Text style={{ marginBottom: 5 }}>
            당근마켓은 휴대폰 번호로 가입 해요.{" "}
          </Text>
          <Text style={{ marginBottom: 5 }}>
            번호는<FatText> 안전하게 보관 </FatText>되며
          </Text>
          <Text style={{ marginBottom: 5 }}>어디에도 공개되지 않아요.</Text>
        </TextContainer>
      </SignUpHeader>

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
        editable={isVerify ? false : true}
        keyboardType="numeric"
        onChangeText={(text) => setValue("phoneNumber", text)}
        value={watch("phoneNumber")}
        onFocus={() => setIsNumberFocused(true)}
        onBlur={() => setIsNumberFocused(false)}
        style={
          isNumberFocused
            ? { borderColor: theme.theme.textColor }
            : { borderColor: theme.theme.borderColor }
        }
      />
      <ErrorMessage message={errors?.phoneNumber?.message} />

      <Button
        text="인증문자 받기"
        onPress={handleSubmit(receiveAuthMessage)}
        disabled={!watch("phoneNumber")}
        isGray
      />

      {isVerify && (
        <VerifyContainer>
          <TextInput
            placeholder="인증번호 입력"
            ref={verifyNumberRef}
            editable={inputUsername ? false : true}
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
            onPress={handleSubmit(checkVerifyMessage)}
            disabled={!watch("verifyNumber")}
          />
        </VerifyContainer>
      )}

      {inputUsername && (
        <UsernameContainer>
          <TextInput
            placeholder="닉네임"
            ref={usernameRef}
            returnKeyType="done"
            onChangeText={(text) => setValue("username", text)}
            value={watch("username")}
            onFocus={() => setIsUsernameFocused(true)}
            onBlur={() => setIsUsernameFocused(false)}
            style={
              isUsernameFocused
                ? { borderColor: theme.theme.textColor }
                : { borderColor: theme.theme.borderColor }
            }
          />
          <ErrorMessage message={errors?.username?.message} />

          <Button
            text="회원가입"
            onPress={handleSubmit(onValid)}
            disabled={!watch("username") || !watch("verifyNumber")}
          />
        </UsernameContainer>
      )}

      <NavigationBtn
        onPress={() =>
          navigation.navigate("LogIn", { location: route?.params?.location })
        }
      >
        <Text>
          계정이 있나요? <FatText>로그인으로 이동</FatText>
        </Text>
      </NavigationBtn>
    </AuthLayout>
  );
}

export default SignUp;
