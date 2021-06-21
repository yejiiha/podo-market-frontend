import { makeVar } from "@apollo/client";
import { IP_ADDRESS } from "react-native-dotenv";

export const isLoggedInVar = makeVar(false);

export const logUserIn = () => isLoggedInVar(true);
export const logUserOut = () => isLoggedInVar(false);

export const BASE_URL = `http://${IP_ADDRESS}:8090`;
