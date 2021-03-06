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
import { Alert } from "react-native";
import { logoutInstance, logUserIn } from "../../../axios";

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

const TextContainer = styled.View`
  align-items: center;
  margin-bottom: 50px;
`;

export const NavigationBtn = styled.TouchableOpacity`
  margin-top: 20px;
  align-items: center;
`;

function LogIn({ navigation, route }: Props) {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [memberId, setMemberId] = useState(0);
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

  const onValid = (data: any) => {
    const { phoneNumber } = data;

    logoutInstance
      .get(`/login`, {
        params: { phoneNumber },
      })
      .then(async (response) => {
        const { memberId, token } = response?.data;

        if (memberId) {
          setMemberId(memberId);
          await logUserIn(token, memberId);
        }
      })
      .catch((error) => {
        console.log("??????", error);
      });
  };

  useEffect(() => {
    if (memberId !== 0) {
      Alert.alert(`${memberId} is logged in.`);
    }
  }, [memberId]);

  useEffect(() => {
    register("phoneNumber", {
      minLength: {
        value: 11,
        message: "??????????????? ?????? 11?????? ?????? ??????????????? ?????????.",
      },
    });
  }, [register]);

  return (
    <AuthLayout>
      <TextContainer>
        <Text>?????? ???????????? ?????? ????????????, ????????? ????????????.</Text>
        <Text>????????? ????????? ????????? ????????? ????????????.</Text>
      </TextContainer>

      <TextInput
        placeholder="??? ??????"
        ref={locationRef}
        editable={false}
        onSubmitEditing={() => onNext(phoneNumberRef)}
        returnKeyType="next"
        onChangeText={(text) => setValue("location", text)}
        value={watch("location")}
      />

      <TextInput
        placeholder="????????? ??????(- ?????? ????????? ??????)"
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
        text="?????????"
        onPress={handleSubmit(onValid)}
        disabled={!watch("phoneNumber")}
      />

      <NavigationBtn
        onPress={() =>
          navigation.navigate("SignUp", { location: route?.params?.location })
        }
      >
        <Text>
          ????????? ?????????? <FatText>?????????????????? ??????</FatText>
        </Text>
      </NavigationBtn>
    </AuthLayout>
  );
}

export default LogIn;
