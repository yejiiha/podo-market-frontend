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
}

const TextContainer = styled.View`
  align-items: center;
  margin-bottom: 50px;
`;

function SignUp({ navigation, route }: Props) {
  const theme = useTheme();
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isNumberFocused, setIsNumberFocused] = useState(false);

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

  const onValid = (data: any) => {
    const { location, username, phoneNumber } = data;
    console.log(location, username, phoneNumber);
    navigation.navigate("LogIn", {
      phoneNumber,
      location,
    });
  };

  useEffect(() => {
    register("username", {
      required: "닉네임은 필수 사항입니다.",
      minLength: {
        value: 2,
        message: "닉네임은 최소 2글자 이상 입력되어야 합니다.",
      },
    });
    register("phoneNumber", {
      required: "번호는 필수 사항입니다.",
      minLength: {
        value: 11,
        message: "전화번호는 최소 11글자 이상 입력되어야 합니다.",
      },
    });
  }, [register]);

  return (
    <AuthLayout>
      <TextContainer>
        <Text>중고 거래부터 동네 정보까지, 이웃과 함께해요.</Text>
        <Text>가깝고 따뜻한 당신의 근처를 만들어요.</Text>
      </TextContainer>

      <TextInput
        placeholder="내 동네"
        ref={locationRef}
        editable={false}
        onSubmitEditing={() => onNext(usernameRef)}
        returnKeyType="next"
        onChangeText={(text) => setValue("location", text)}
        value={watch("location")}
      />

      <TextInput
        placeholder="닉네임"
        ref={usernameRef}
        onSubmitEditing={() => onNext(phoneNumberRef)}
        returnKeyType="next"
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

      <TextInput
        placeholder="휴대폰 번호(- 없이 숫자만 입력)"
        ref={phoneNumberRef}
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
        text="회원가입 하기"
        onPress={handleSubmit(onValid)}
        disabled={!watch("phoneNumber") || !watch("username")}
      />

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
