import { useCallback, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  I18nManager,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef, navigate } from "./hooks/RootNavigation";
import GlobalStyle from "./hooks/GlobalStyle";
import Login from "./screens/common/Login";
import ExtensionDirectory from "./screens/common/ExtensionDirectory";
import Dashboard from "./screens/navigation/Dashboard";
import BottomNavigation from "./screens/navigation/BottomNavigation";
import AddTicket from "./screens/support/AddTicket";
import Meeting from "./screens/generalsection/Meeting";
import MeetingDetails from "./components/meeting/MeetingDetails";
import EmployeeStatus from "./screens/employees/EmployeeStatus";
import ActiveDirectory from "./screens/employees/ActiveDirectory";

const Stack = createNativeStackNavigator();
export default function App() {
  SplashScreen.preventAutoHideAsync();

  useEffect(() => {
    if (I18nManager.isRTL) {
      I18nManager.forceRTL(false);
      I18nManager.allowRTL(false);
    }
    console.log(I18nManager.isRTL);
  });
  //Custom Fonts load
  const [fontsLoaded, fontError] = useFonts({
    sstlight: require("./assets/fonts/SST-Arabic-Light.ttf"),
    sstbold: require("./assets/fonts/SST-Arabic-Bold.ttf"),
    sstroman: require("./assets/fonts/SST-Arabic-Roman.ttf"),
    sstmedium: require("./assets/fonts/SST-Arabic-Medium.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  //custom fonts load end here

  return (
    <View
      className="flex-1"
      onLayout={onLayoutRootView}
    >
      <StatusBar style="auto" />
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{ headerShown: false, gestureEnabled: false }}
          initialRouteName="Login"
        >
          <Stack.Screen
            name="Login"
            component={Login}
          />
          <Stack.Screen
            name="ExtensionDirectory"
            component={ExtensionDirectory}
          />

          <Stack.Screen
            name="BottomNavigation"
            component={BottomNavigation}
          />
          <Stack.Screen
            name="AddTicket"
            component={AddTicket}
          />
          <Stack.Screen
            name="Meeting"
            component={Meeting}
          />
          <Stack.Screen
            name="MeetingDetails"
            component={MeetingDetails}
          />
          <Stack.Screen
            name="EmployeeStatus"
            component={EmployeeStatus}
          />
          <Stack.Screen
            name="ActiveDirectory"
            component={ActiveDirectory}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
