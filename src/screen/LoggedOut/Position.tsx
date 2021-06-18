import React, { useEffect, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import * as Location from "expo-location";
import axios from "axios";
import styled from "styled-components/native";
import * as Permissions from "expo-permissions";
import { VWORLD_API_KEY } from "react-native-dotenv";
import { FatText } from "../../theme/theme";
import Button from "../../components/Button";
import { LoggedOutStackNavParamList } from "../../navigators/LoggedOutNav";
import { WelcomeContainer, Row } from "./Welcome";

type PositionNavigationProp = StackNavigationProp<
  LoggedOutStackNavParamList,
  "Position"
>;

type Props = {
  navigation: PositionNavigationProp;
};

const SERVER =
  "http://api.vworld.kr/req/address?service=address&request=getAddress&version=2.0&crs=epsg:4326";

const LocationText = styled(FatText)`
  font-size: 18px;
  margin-bottom: 120px;
`;

function Position({ navigation }: Props) {
  const [latitude, setLatitude] = useState<any | null>(null);
  const [longitude, setLongitude] = useState<any | null>(null);
  const [sido, setSido] = useState("Loading... ");
  const [city, setCity] = useState("Loading... ");
  const [town, setTown] = useState("Loading...");

  // lat, lng 좌표 값 받기
  useEffect(() => {
    (async () => {
      const { status } = await Permissions.getAsync(Permissions.LOCATION);
      if (status !== "granted") {
        return;
      }

      let {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setLatitude(latitude);
      setLongitude(longitude);
    })();
  }, []);

  // 시,도 / 시,군,구 / 읍,면,동 값 받기
  axios
    .get(
      `${SERVER}&point=${longitude},${latitude}&type=both&zipcode=false&simple=true&key=${VWORLD_API_KEY}`
    )
    .then(function (response) {
      if (response) {
        const sido = response.data.response.result[0].structure.level1;
        const city = response.data.response.result[0].structure.level2;
        const town = response.data.response.result[0].structure.level4L;
        if (sido) {
          setSido(sido);
        }
        if (city) {
          setCity(city);
        }
        if (town) {
          setTown(town);
        }
      }
    })
    .catch(function (error) {
      console.log(error.message);
    });

  const location = `${sido} ${city} ${town}`;

  return (
    <WelcomeContainer>
      <Row>
        <LocationText>{location}</LocationText>
      </Row>
      <Row>
        <Button
          text="둘러보기"
          onPress={() => navigation.navigate("Home")}
          isGray
        />
        <Button
          text="로그인하기"
          onPress={() => navigation.navigate("LogIn", { location })}
        />
        <Button
          text="회원가입하기"
          onPress={() => navigation.navigate("SignUp", { location })}
          isBorder
        />
      </Row>
    </WelcomeContainer>
  );
}

export default Position;
