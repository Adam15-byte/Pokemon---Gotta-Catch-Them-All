import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { SIZES, FONTS } from "../../../assets/consts/consts";
import {
  catchingVisibilityToFalse,
  catchingInitiatedToTrue,
} from "../../features/CatchingVisibility";
import { useDispatch } from "react-redux";
import { setPokemonToEmpty } from "../../features/CurrentPokemonSlice";

interface Props {
  Message: string;
  onPress: () => void;
}

const MessageBox: React.FC<Props> = ({ Message, onPress }) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text numberOfLines={2} style={styles.message}>
        {Message}
      </Text>
      <Pressable
        onPress={() => {
          dispatch(catchingVisibilityToFalse());
          dispatch(catchingInitiatedToTrue());
          dispatch(setPokemonToEmpty());
          setTimeout(() => {
            onPress();
          }, 500);
        }}
        style={styles.buttonContainer}
      >
        <Text style={styles.buttonText}>Search next</Text>
        <Image
          source={require("../../../assets/images/ButtonPixelated.png")}
          resizeMode="contain"
          style={styles.buttonImage}
        />
      </Pressable>
      <Image
        source={require("../../../assets/images/MessageBox.png")}
        resizeMode="contain"
        style={styles.boxImage}
      />
    </View>
  );
};

export default MessageBox;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: SIZES.SCREEN_HEIGHT,
    width: SIZES.SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  boxImage: {
    width: "85%",
    height: 200,
    zIndex: 1,
  },
  buttonImage: {
    width: 154,
    height: 62,
    zIndex: 2,
  },
  buttonContainer: {
    zIndex: 2,
    position: "absolute",
    top: SIZES.SCREEN_HEIGHT / 2 + 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    ...FONTS.h4,
    position: "absolute",
    zIndex: 3,
  },
  message: {
    ...FONTS.h2,
    textAlign: "center",
    position: "absolute",
    zIndex: 2,
    top: SIZES.SCREEN_HEIGHT / 2 - 40,
    marginHorizontal: 80,
  },
});
