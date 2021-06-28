import axios from "axios";
import { makeVar } from "@apollo/client";
import { IP_ADDRESS } from "react-native-dotenv";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const isLoggedInVar = makeVar(false);

export const TOKEN = "token";

export const logUserIn = async (token: string) => {
  await AsyncStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logUserOut = async () => {
  AsyncStorage.removeItem(TOKEN);
  isLoggedInVar(false);
};

export const logoutInstance = axios.create({
  baseURL: `http://${IP_ADDRESS}:8090`,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

const instance = axios.create({
  baseURL: `http://${IP_ADDRESS}:8090`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default instance;
