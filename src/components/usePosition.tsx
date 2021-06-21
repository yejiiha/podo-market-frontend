import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import axios from "axios";
import * as Permissions from "expo-permissions";
import { VWORLD_API_KEY } from "react-native-dotenv";

function usePosition() {
  const SERVER =
    "http://api.vworld.kr/req/address?service=address&request=getAddress&version=2.0&crs=epsg:4326";

  const [fetchData, setFetchData] = useState<any | null>(null);
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
    .then((response) => {
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
    .catch((error) => {
      console.log(error.message);
    });

  const sigun = `${city}`;
  const dong = `${town}`;
  const location = `${sido} ${city} ${town}`;

  const data = {
    sigun,
    dong,
    location,
  };

  return { data };
}

export default usePosition;
