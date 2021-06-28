import React, { useState } from "react";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components/native";
import { StackNavFactoryParamList } from "../../../navigators/StackNavFactory";
import { Avatar } from "../MyPodo";
import { TextInput, useTheme } from "../../../theme/theme";
import ErrorMessage from "../../../components/ErrorMessage";
import { DismissKeyboard } from "../../../components/DismissKeyboard";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import instance, { TOKEN } from "../../../../axios";

interface IEditProfile {
  route: RouteProp<StackNavFactoryParamList, "EditProfile">;
  navigation: NavigationProp<StackNavFactoryParamList, "EditProfile">;
}

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.theme.bgColor};
`;

const InputContainer = styled.View`
  align-items: center;
  padding: 10px;
`;

const UserAvatar = styled(Avatar)`
  margin-top: 30px;
  width: 120px;
  height: 120px;
  border-radius: 60px;
`;

const Input = styled(TextInput)`
  padding: 12px;
  margin-top: 30px;
  text-align: center;
  border-radius: 5px;
  font-size: 16px;
`;

const SubmitBtn = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: ${(props) =>
    props.disabled
      ? props.theme.theme.borderColor
      : props.theme.theme.podoColor};
  padding: 15px 0;
`;

const SubmitBtnText = styled.Text`
  color: white;
  font-weight: 600;
  text-align: center;
  font-size: 16px;
`;

function EditProfile({ navigation, route }: IEditProfile) {
  const theme = useTheme();
  const nickname = route.params.nickname;
  const memberId = route.params.memberId;
  const [isFocused, setIsFocused] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nickname,
    },
  });

  const onValid = async (data: any) => {
    const { nickname } = data;
    const token = await AsyncStorage.getItem(TOKEN);

    instance
      .put(
        `/members/${memberId}`,
        { nickname },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        const memberId = response?.data;

        if (memberId) {
          Alert.alert("프로필이 변경되었습니다.");
        }
      })
      .catch((error) => {
        console.log("⚠️", error);
      });
  };

  useEffect(() => {
    register("nickname", {
      required: "닉네임을 입력해주세요!",
      minLength: {
        value: 2,
        message: "닉네임은 2자 이상 입력해주세요.",
      },
      pattern: {
        value: /^[A-Za-z0-9가-힣]+$/i,
        message: "닉네임은 띄어쓰기 없이 한글, 영문, 숫자만 가능해요.",
      },
    });
  }, [register]);

  return (
    <DismissKeyboard>
      <Container>
        <KeyboardAvoidingView
          behavior="height"
          keyboardVerticalOffset={Platform.OS === "ios" ? 65 : 0}
          style={{
            width: "100%",
            flex: 1,
          }}
        >
          <InputContainer>
            <UserAvatar source={require("../../../../assets/user-icon.png")} />
            <Input
              placeholder="닉네임을 입력해주세요."
              value={watch("nickname")}
              onChangeText={(text) => setValue("nickname", text)}
              returnKeyType="done"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onSubmitEditing={handleSubmit(onValid)}
              style={
                isFocused
                  ? { borderColor: theme.theme.textColor }
                  : { borderColor: theme.theme.borderColor }
              }
            />
            <ErrorMessage message={errors?.nickname?.message} />
          </InputContainer>

          <SubmitBtn
            onPress={handleSubmit(onValid)}
            disabled={!watch("nickname")}
          >
            <SubmitBtnText>완료</SubmitBtnText>
          </SubmitBtn>
        </KeyboardAvoidingView>
      </Container>
    </DismissKeyboard>
  );
}

export default EditProfile;
