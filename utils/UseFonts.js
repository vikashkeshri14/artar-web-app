import * as Font from "expo-font";

const useFonts = async () => {
  await Font.loadAsync({
    sstlight: require("../assets/fonts/SST-Arabic-Light.ttf"),
    sstbold: require("../assets/fonts/SST-Arabic-Bold.ttf"),
    sstroman: require("../assets/fonts/SST-Arabic-Roman.ttf"),
    sstmedium: require("../assets/fonts/SST-Arabic-Medium.ttf"),
  });
};

export default useFonts;
