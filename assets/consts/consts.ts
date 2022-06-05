import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const FONTS = {
  h1: {
    fontSize: 24,
    fontFamily: "PressStart2P_400Regular",
  },
  h2: {
    fontSize: 20,
    fontFamily: "PressStart2P_400Regular",
  },
  h3: {
    fontSize: 16,
    fontFamily: "PressStart2P_400Regular",
  },
  h4: {
    fontSize: 12,
    fontFamily: "PressStart2P_400Regular",
  },
};

export const SIZES = {
  SCREEN_WIDTH: width,
  SCREEN_HEIGHT: height,
};