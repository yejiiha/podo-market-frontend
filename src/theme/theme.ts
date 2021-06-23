import { useColorScheme } from "react-native-appearance";
import { DefaultTheme } from "styled-components";
import styled from "styled-components/native";

export const darkTheme: DefaultTheme = {
  theme: {
    textColor: "white",
    bgColor: "#0C0513",
    formColor: "#2c2c2c",
    borderColor: "#525252",
    darkGray: "#8e8e8e",
    lightGray: "#EFEFEF",
    btnTextColor: "white",
    podoColor: "#a675dd",
    closeBtnColor: "rgba(255,255,255,0.6)",
    lightPodoColor: "#F2EBFA",
  },
};

export const lightTheme: DefaultTheme = {
  theme: {
    textColor: "rgb(38, 38, 38)",
    bgColor: "#fafafa",
    formColor: "white",
    borderColor: "rgb(219, 219, 219)",
    darkGray: "#8e8e8e",
    lightGray: "#EFEFEF",
    btnTextColor: "white",
    podoColor: "#a675dd",
    closeBtnColor: "rgba(38,38,38,0.6)",
    lightPodoColor: "#F2EBFA",
  },
};

export const useTheme = () => {
  const isDarkMode = useColorScheme() === "dark";
  return isDarkMode ? darkTheme : lightTheme;
};

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.theme.bgColor};
  color: ${(props) => props.theme.theme.textColor};
`;

export const Text = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.theme.textColor};
`;

export const FatText = styled(Text)`
  font-weight: 600;
`;

export const TextInput = styled.TextInput`
  width: 100%;
  padding: 15px 10px;
  border: 1px solid ${(props) => props.theme.theme.borderColor};
  border-radius: 10px;
  color: ${(props) => props.theme.theme.textColor};
  margin-bottom: 10px;
`;
