import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground as DefaultImageBackground,
} from "react-native";
import React from "react";
import FontPreload from "./FontPreload";
import { SIZES } from "./assets/consts/consts";
import { Provider } from "react-redux";
import { store } from "./src/features/store";

export default function App() {
  type ImageBackgroundProps = DefaultImageBackground["props"] & {
    children: React.ReactNode;
  };

  function MyBackground(props: ImageBackgroundProps) {
    return <DefaultImageBackground {...props} />;
  }
  return (
    <Provider store={store}>
      <MyBackground
        source={require("./assets/images/background.jpg")}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <FontPreload />
      </MyBackground>
    </Provider>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: SIZES.SCREEN_WIDTH,
    height: SIZES.SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    
  },
});
