import React, { useEffect } from "react";
import styled from "styled-components/native";
import { useForm } from "react-hook-form";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { useTheme } from "../../../theme/theme";
import { DismissKeyboard } from "../../../components/DismissKeyboard";
import usePosition from "../../../components/usePosition";
import { LoggedInNavParamList } from "../../../navigators/LoggedInNav";
import { useState } from "react";

type UploadFormProp = {
  title: string;
  price: string;
  detail: string;
  photos?: string;
};

interface Props {
  route: RouteProp<LoggedInNavParamList, "ItemUploadNav">;
}

const Wrapper = styled.ScrollView`
  flex: 1;
  padding: 15px;
  background-color: ${(props) => props.theme.theme.bgColor};
`;

const SelectPhotoContainer = styled.View`
  flex-direction: row;
  width: 100%;
  height: 100px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.theme.borderColor};
`;

const SelectPhotoBtn = styled.TouchableOpacity`
  margin-right: 10px;
  width: 70px;
  height: 70px;
  border-radius: 5px;
  border-width: 1px;
  border-color: ${(props) => props.theme.theme.borderColor};
  justify-content: center;
  align-items: center;
`;

const ChoosenPhotoContainer = styled.View`
  margin-left: 10px;
`;

const ChoosenPhoto = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 5px;
`;

const ChoosenPhotoDelete = styled.TouchableOpacity`
  position: absolute;
  top: -7px;
  right: -7px;
  width: 17px;
  height: 17px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.theme.closeBtnColor};
`;

const TitleContainer = styled.View`
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.theme.borderColor};
`;

const TitleInput = styled.TextInput`
  width: 100%;
  padding: 25px 0;
  font-size: 16px;
  color: ${(props) => props.theme.theme.textColor};
`;

const CategoryContainer = styled.TouchableOpacity`
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.theme.borderColor};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;

const Column = styled.View``;

const CategoryText = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.theme.textColor};
`;

const PriceContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.theme.borderColor};
`;

const PriceText = styled.Text`
  font-size: 16px;
  color: rgb(195, 195, 195);
  margin-right: 5px;
`;

const PriceInput = styled(TitleInput)``;

const ItemDetailContainer = styled.View`
  width: 100%;
  min-height: 400px;
`;

const DetailInput = styled(TitleInput)``;

const HeaderRightContainer = styled.TouchableOpacity`
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;

const HeaderRightText = styled.Text`
  color: ${(props) => props.theme.theme.podoColor};
  font-size: 17px;
  margin-right: 15px;
`;

function ItemUpload({ route }: Props) {
  const {
    data: { dong },
  } = usePosition();
  const { localUri, takenPhoto } = route.params ?? "";

  const [albumPhoto, setAlbumPhoto] = useState("");
  const [cameraPhoto, setCameraPhoto] = useState("");

  useEffect(() => {
    if (localUri) {
      setAlbumPhoto(localUri);
    }
  }, [localUri]);

  useEffect(() => {
    if (takenPhoto) {
      setCameraPhoto(takenPhoto);
    }
  }, [takenPhoto]);

  const navigation = useNavigation();

  const { watch, register, handleSubmit, setValue } = useForm<UploadFormProp>();
  const theme = useTheme();

  const onPress = () => {
    if (albumPhoto) {
      setAlbumPhoto("");
    }
    if (cameraPhoto) {
      setCameraPhoto("");
    }
  };

  const onValid = (data: any) => {
    console.log(data);
  };

  const headerRight = () => (
    <HeaderRightContainer
      onPress={handleSubmit(onValid)}
      disabled={!watch("title") || !watch("price") || !watch("detail")}
    >
      <HeaderRightText>완료</HeaderRightText>
    </HeaderRightContainer>
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: headerRight,
    });
  }, []);

  useEffect(() => {
    register("title", {
      required: "제목은 필수 입력 항목입니다.",
    });
    register("price", {
      required: "가격은 필수 입력 항목입니다.",
    });
    register("detail", {
      required: "내용은 필수 입력 항목입니다.",
    });
  }, [register]);

  return (
    <DismissKeyboard>
      <Wrapper>
        <SelectPhotoContainer>
          <SelectPhotoBtn onPress={() => navigation.navigate("PhotoNav")}>
            <Ionicons name="camera" size={24} color="gray" />
          </SelectPhotoBtn>
          {(albumPhoto !== "" || cameraPhoto !== "") && (
            <ChoosenPhotoContainer>
              <ChoosenPhoto
                source={{ uri: albumPhoto ? albumPhoto : cameraPhoto }}
              />
              <ChoosenPhotoDelete onPress={onPress}>
                <Ionicons
                  name="close"
                  size={15}
                  color="white"
                  style={{
                    padding: 0,
                    left: 1,
                    position: "absolute",
                  }}
                />
              </ChoosenPhotoDelete>
            </ChoosenPhotoContainer>
          )}
        </SelectPhotoContainer>
        <TitleContainer>
          <TitleInput
            placeholder="글 제목"
            onChangeText={(text) => setValue("title", text)}
            value={watch("title")}
          />
        </TitleContainer>
        <CategoryContainer
          activeOpacity={1}
          onPress={() => navigation.navigate("ItemUploadCategory")}
        >
          <Column>
            <CategoryText>카테고리 선택</CategoryText>
          </Column>
          <Column>
            <FontAwesome
              name="angle-right"
              size={24}
              color={theme.theme.textColor}
            />
          </Column>
        </CategoryContainer>
        <PriceContainer>
          <PriceText>&#8361;</PriceText>
          <PriceInput
            placeholder=" 가격"
            keyboardType="numeric"
            onChangeText={(text) => setValue("price", text)}
            value={watch("price")}
          />
        </PriceContainer>
        <ItemDetailContainer>
          <DetailInput
            multiline={true}
            numberOfLines={10}
            placeholderTextColor={theme.theme.borderColor}
            placeholder={`${dong}에 올릴 게시글 내용을 작성해주세요. (가품 및 판매금지 품목은 게시가 제한될 수 있어요.)`}
            onChangeText={(text) => setValue("detail", text)}
            value={watch("detail")}
          />
        </ItemDetailContainer>
      </Wrapper>
    </DismissKeyboard>
  );
}

export default ItemUpload;
