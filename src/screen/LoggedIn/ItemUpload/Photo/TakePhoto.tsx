import React, { useEffect, useState, useRef } from "react";
import {
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useIsFocused } from "@react-navigation/core";
import { Camera } from "expo-camera";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { LoggedInNavParamList } from "../../../../navigators/LoggedInNav";

interface Props {
  navigation: StackNavigationProp<LoggedInNavParamList, "PhotoNav">;
  route: RouteProp<LoggedInNavParamList, "PhotoNav">;
}

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Actions = styled.View`
  position: absolute;
  width: 100%;
  bottom: 0;
  flex: 0.3;
  align-items: center;
  justify-content: center;
  padding: 0 20px 20px;
  background-color: black;
`;

const SliderContainer = styled.View``;

const CancelContainer = styled.TouchableOpacity``;

const ButtonsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CameraContainer = styled.View`
  align-items: center;
`;

const TakePhotoBtn = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  background-color: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 50px;
`;

const CameraSwitchContainer = styled.View`
  align-items: center;
`;

const PhotoActions = styled(Actions)`
  height: 70px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const RetakeContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

const UploadContainer = styled(RetakeContainer)``;

export default function TakePhoto({ navigation }: Props) {
  const camera = useRef(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [ok, setOk] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [zoom, setZoom] = useState(0);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [takenPhoto, setTakenPhoto] = useState("");
  const isFocused = useIsFocused();

  const getPermissions = async () => {
    const { granted } = await Camera.requestPermissionsAsync();
    setOk(granted);
  };

  useEffect(() => {
    getPermissions();
  }, []);

  const onCameraSwitch = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };

  const onZoomValueChange = (e: any) => {
    setZoom(e);
  };

  const onCameraReady = () => setCameraReady(true);

  const takePhoto = async () => {
    if (camera && cameraReady) {
      // @ts-ignore
      const result = await camera.current.takePictureAsync({
        quality: 1,
        exif: true,
      });
      setTakenPhoto(result.uri);
    }
  };

  return (
    <Container>
      {isFocused ? <StatusBar hidden={true} /> : null}
      {takenPhoto === "" ? (
        <Camera
          type={cameraType}
          zoom={zoom}
          style={{ flex: 1 }}
          flashMode={flashMode}
          ref={camera}
          onCameraReady={onCameraReady}
        >
          {takenPhoto === "" ? (
            <Actions>
              <SliderContainer>
                <Slider
                  style={{ width: 200, height: 40 }}
                  minimumValue={0}
                  maximumValue={1}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="rgba(255,255,255,0.5)"
                  onValueChange={onZoomValueChange}
                />
              </SliderContainer>
              <ButtonsContainer>
                <CancelContainer
                  onPress={() => navigation.navigate("PhotoNav")}
                >
                  <Text style={{ color: "white", fontSize: 18 }}>Cancel</Text>
                </CancelContainer>

                <CameraContainer>
                  <TakePhotoBtn onPress={takePhoto} />
                </CameraContainer>
                <CameraSwitchContainer>
                  <TouchableOpacity onPress={onCameraSwitch}>
                    <Ionicons size={40} color="white" name="camera-reverse" />
                  </TouchableOpacity>
                </CameraSwitchContainer>
              </ButtonsContainer>
            </Actions>
          ) : null}
        </Camera>
      ) : (
        <ImageBackground source={{ uri: takenPhoto }} style={{ flex: 1 }}>
          {takenPhoto !== "" && (
            <>
              <PhotoActions>
                <RetakeContainer onPress={() => setTakenPhoto("")}>
                  <Text style={{ color: "white", fontSize: 18 }}>Retake</Text>
                </RetakeContainer>
                <UploadContainer
                  onPress={() =>
                    navigation.navigate("ItemUpload", {
                      takenPhoto,
                    })
                  }
                >
                  <Text style={{ color: "white", fontSize: 18 }}>
                    Use Photo
                  </Text>
                </UploadContainer>
              </PhotoActions>
            </>
          )}
        </ImageBackground>
      )}
    </Container>
  );
}
