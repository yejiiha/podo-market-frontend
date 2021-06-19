import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Image,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  StatusBar,
  useWindowDimensions,
  Text,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import { useTheme } from "../../../../theme/theme";

export interface PHOTO {
  index: number;
  uri: string;
}

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.theme.bgColor};
`;

const Top = styled.View`
  flex: 1;
`;
const Bottom = styled.View`
  flex: 1;
`;

const ImageContainer = styled.TouchableOpacity`
  position: relative;
`;

function SelectPhoto() {
  const navigation = useNavigation();
  const theme = useTheme();
  const [ok, setOk] = useState(false);
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);
  const [choosen, setChoosen] = useState<Array<string>>([]);
  const [lastPhotoId, setLastPhotoId] = useState<string>("");
  const [hasNext, setHasNext] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { width } = useWindowDimensions();
  const numColumns = 3;
  const getPermissions = async () => {
    const { canAskAgain, granted } = await MediaLibrary.getPermissionsAsync();
    if (!granted && canAskAgain) {
      const permission = await MediaLibrary.requestPermissionsAsync();

      if (permission.granted) {
        setOk(true);
        getPhotos();
      }
    } else if (granted) {
      setOk(true);
      getPhotos();
    }
  };
  const getPhotos = async () => {
    setRefreshing(true);
    const { assets, endCursor, hasNextPage } =
      await MediaLibrary.getAssetsAsync({
        first: photos.length > 0 ? photos.length : 20,
      });
    setPhotos(assets);
    setLastPhotoId(endCursor);
    setHasNext(hasNextPage);
    setRefreshing(false);
  };

  const fetchMorePhoto = async () => {
    if (hasNext) {
      const { assets, endCursor, hasNextPage } =
        await MediaLibrary.getAssetsAsync({ first: 20, after: lastPhotoId });

      setPhotos((prev) => [...prev, ...assets]);
      setLastPhotoId(endCursor);
      setHasNext(hasNextPage);
    }
  };
  const selected = (uri: string) => choosen.some((c) => c === uri);
  const toggleChoosen = (uri: string) => {
    if (selected(uri)) {
      setChoosen(choosen.filter((c) => c !== uri));
    } else {
      setChoosen((prev) => [uri, ...prev]);
    }
  };
  const isFocused = useIsFocused();

  interface AssetIndexAdded extends MediaLibrary.Asset {
    index: number;
    uri: any;
  }

  const RenderItem: React.FC<AssetIndexAdded> = ({ uri, index }) => {
    return (
      <ImageContainer onPress={() => toggleChoosen(uri)}>
        <Image
          source={{ uri }}
          style={{
            width: width / numColumns,
            height: width / numColumns,
          }}
        />

        {selected(uri) && (
          <View
            style={{
              width: 19,
              height: 19,
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              right: 5,
              bottom: 5,
              borderRadius: 9.5,
              borderColor: "white",
              backgroundColor: "white",
            }}
          >
            <Ionicons
              name="checkmark-circle"
              size={19}
              color={theme.theme.podoColor}
              style={{ right: -1 }}
            />
          </View>
        )}
      </ImageContainer>
    );
  };

  const renderPhoto: ListRenderItem<MediaLibrary.Asset> = ({ item, index }) => {
    return <RenderItem index={index} {...item} />;
  };

  useEffect(() => {
    getPermissions();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            if (choosen.length > 0) {
              navigation.navigate("ItemUpload", { localUri: choosen[0] });
            }
          }}
        >
          <Text
            style={{
              color: choosen.length > 0 ? theme.theme.podoColor : "gray",
              marginRight: 15,
              fontWeight: "600",
              fontSize: 16,
            }}
          >
            확인
          </Text>
        </TouchableOpacity>
      ),
      headerBackTitleVisible: false,
      headerBackImage: ({ tintColor }: { tintColor: string }) => (
        <Ionicons
          name="ios-close"
          color={tintColor}
          size={30}
          style={{ paddingLeft: 8 }}
        />
      ),
      headerTintColor: theme.theme.textColor,
      headerStyle: { backgroundColor: theme.theme.bgColor },
    });
  }, [choosen]);

  useEffect(() => {
    if (navigation.isFocused()) {
      getPhotos();
    }
  }, [navigation.isFocused()]);

  return (
    <Container>
      {isFocused && <StatusBar hidden={false} />}
      <Top>
        {choosen.length > 0 && (
          <Image source={{ uri: choosen[0] }} style={{ flex: 1 }} />
        )}
      </Top>
      <Bottom>
        <FlatList
          onRefresh={getPhotos}
          refreshing={refreshing}
          data={photos}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderPhoto}
          onEndReached={fetchMorePhoto}
          numColumns={numColumns}
        />
      </Bottom>
    </Container>
  );
}

export default SelectPhoto;
