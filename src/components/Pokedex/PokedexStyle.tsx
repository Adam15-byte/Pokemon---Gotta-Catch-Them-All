import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../../assets/consts/consts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SIZES.SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  insidePokedex: {
    position: "absolute",
    width: SIZES.SCREEN_WIDTH * 0.9,
    zIndex: 2,
    top: 30,
  },
  outsideContainer: {
    position: "absolute",
    flex: 2,
    zIndex: 300,
    top: 0,
    width: SIZES.SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  outsidePokedex: {
    position: "absolute",
    width: SIZES.SCREEN_WIDTH * 0.9,
    zIndex: 300,
    top: 30,
  },
  greenButtonContainer: {
    zIndex: 10,
    position: "absolute",
    bottom: SIZES.SCREEN_HEIGHT * 0.1,
    left: SIZES.SCREEN_WIDTH * 0.3,
    width: SIZES.SCREEN_WIDTH * 0.3,
    height: SIZES.SCREEN_HEIGHT * 0.1,
    backgroundColor: COLORS.green,
  },
  flashIndicatorContainer: {
    position: "absolute",
    zIndex: 20,
    top: SIZES.SCREEN_HEIGHT * 0.11,
    right: SIZES.SCREEN_WIDTH * 0.13,
    width: 70,
    height: 70,
  },
  flashIndicatorImage: {
    zIndex: 20,
    width: 70,
    height: 70,
  },
  transparentIndicator: {
    zIndex: 19,
    width: 70,
    height: 70,
    position: "absolute",
  },
  infoTabContainer: {
    position: "absolute",
    zIndex: 20,
    top: SIZES.SCREEN_HEIGHT * 0.21,
    width: 250,
    height: 90,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  infoCardContainer: {
    zIndex: 1,
    position: "absolute",
    bottom: SIZES.SCREEN_HEIGHT * 0.35,
    left: SIZES.SCREEN_WIDTH * 0.18,
    width: SIZES.SCREEN_WIDTH * 0.64,
    height: SIZES.SCREEN_HEIGHT * 0.24,
    backgroundColor: COLORS.white,
  },
  nameContainer: {
    flex: 0.15,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  nameText: {
    ...FONTS.h2,
  },
  iconTypesContainer: {
    flexDirection: "row",
    flex: 0.4,
    width: "100%",
    marginTop: 10,
  },
  statsContainer: {
    flex: 0.45,
  },
  iconContainer: {
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  pokemonImage: {
    width: "80%",
    aspectRatio: 1,
  },
  typesContainer: {
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  typeText: {
    ...FONTS.h3,
  },
  statsHeaderContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 30,
  },
  statsText: {
    ...FONTS.h4,
  },
  flexDisplayRow: {
    flexDirection: "row",
    width: "100%",
  },
  statColumn: {
    width: "50%",
    height: 40,
    alignItems: "center",
    justifyContent: "space-around",
  },
  welcomeContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  welcomeText: {
    ...FONTS.h2,
  },
  welcomeTextSmaller: {
    ...FONTS.h3,
    marginTop: 15,
  },
  infoBar: {
    width: "100%",
    zIndex: 1,
  },
  infoTabText: {
    position: "absolute",
    zIndex: 2,
    ...FONTS.h3,
    marginHorizontal: 30,
    textAlign: "center",
  },
});
