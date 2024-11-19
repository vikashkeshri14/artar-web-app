import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import GlobalStyle from "../../hooks/GlobalStyle";
import i18n from "../../hooks/Language";
import {
  Entypo,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as ApiService from "../../config/config";
import apiList from "../../config/apiList.json";
import * as SecureStore from "expo-secure-store";
import Loading from "../../components/loading/Loading";
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [buttonClick, setButtonClick] = useState(false);
  const [errorText, setErrorText] = useState(
    "Something went wrong try again!!"
  );
  const [error, setError] = useState(false);
  const [key, onChangeKey] = useState("LoginUser");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    checkUserLogin();
  }, []);
  const checkUserLogin = async () => {
    let LoginUser = await SecureStore.getItemAsync("LoginUser");
    let userDetails = JSON.parse(LoginUser);
    console.log(userDetails);
    if (userDetails != null && userDetails.hasOwnProperty("employee_code")) {
      navigation.navigate("BottomNavigation");
    }
  };
  const saveUser = async (key, value) => {
    const auth = JSON.stringify(value);
    await SecureStore.setItemAsync(key, auth);
    return true;
  };

  const onLoginClick = async () => {
    setButtonClick(true);
    setLoading((loading) => true);
    //console.log(token);
    if (!email) {
      setEmailError(true);
      setButtonClick(false);
      setLoading((loading) => false);
      return false;
    }
    if (!password) {
      setEmailError(false);
      setPasswordError(true);
      setButtonClick(false);
      setLoading((loading) => false);
      return false;
    }
    setPasswordError(false);
    const obj = JSON.stringify({
      email: email,
      password: password,
    });
    let params = { url: apiList.login, body: obj };
    let response = await ApiService.postData(params);
    //console.log(response);
    if (response.success) {
      setLoading((loading) => false);

      const save = await saveUser(key, response.results);
      if (save) {
        setEmail("");
        setPassword("");
        navigation.navigate("BottomNavigation");
        setButtonClick(false);
        setError(false);
        return;
      } else {
        setErrorText("Something went wrong try again!!");
        setError(true);
        setButtonClick(false);
      }
    } else {
      setLoading((loading) => false);
      setErrorText("Username or password incorrect!!");
      setError(true);

      setButtonClick(false);
    }
  };
  const toggleShowPassword = async () => {
    setShowPassword((showPassword) => !showPassword);
  };
  return (
    <ImageBackground
      source={require("../../assets/background/gradient.jpg")}
      className="flex-1 w-full bg-cover justify-center "
    >
      <SafeAreaView
        style={GlobalStyle.droidSafeArea}
        className=""
      >
        {loading && <Loading />}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
          keyboardVerticalOffset={40}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView>
              <View className="flex justify-center mt-[30px]">
                <View className="bg-[#fff] rounded-full flex justify-center self-center  w-[150px] h-[150px]">
                  <Image
                    className="self-center"
                    source={require("../../assets/icons/logo.png")}
                  />
                </View>
              </View>
              <View className="flex mb-[45px]">
                <Text
                  style={GlobalStyle.sstbold}
                  className="text-center text-[24px] text-headerText"
                >
                  {i18n.t("it-system")}
                </Text>
              </View>

              <View className="flex ml-[15px] mr-[15px]">
                {error && (
                  <View className="absolute top-[-25px] w-full">
                    <Text className="text-red  font-bold text-center">
                      {errorText}
                    </Text>
                  </View>
                )}
                <View
                  className={
                    emailError
                      ? "flex flex-row  rounded-[15px] bg-[#fff] border border-red pl-[15px] pr-[15px]  h-[48px]"
                      : "flex flex-row  rounded-[15px] bg-[#fff] border border-red pl-[15px] pr-[15px]  h-[48px]"
                  }
                >
                  <View className="justify-center">
                    <Entypo
                      name="user"
                      size={24}
                      color="#ccc"
                    />
                  </View>
                  <TextInput
                    onChangeText={(evt) => setEmail((email) => evt)}
                    value={email}
                    autoCapitalize="none"
                    returnKeyType="done"
                    placeholder={i18n.t("username")}
                    maxLength={10}
                    style={GlobalStyle.sstmedium}
                    className="pl-[15px] pr-3 w-[85%] text-[17px] text-headerText"
                  />
                </View>
                <View
                  className={
                    passwordError
                      ? "flex flex-row mt-[25px] rounded-[15px] bg-[#fff] border border-[#e63636] pl-[15px] pr-[15px]  h-[48px]"
                      : "flex flex-row mt-[25px] rounded-[15px] bg-[#fff] border border-[#D8D8D8] pl-[15px] pr-[15px]  h-[48px]"
                  }
                >
                  <View className="justify-center">
                    <MaterialIcons
                      name="password"
                      size={24}
                      color="#ccc"
                    />
                  </View>
                  <TextInput
                    onChangeText={(evt) => setPassword((password) => evt)}
                    value={password}
                    placeholder={i18n.t("password")}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    returnKeyType="done"
                    style={GlobalStyle.sstmedium}
                    className="pl-[15px] pr-3 w-[85%] text-[17px] text-headerText"
                  />
                  <View className="justify-center">
                    <MaterialCommunityIcons
                      name={showPassword ? "eye-off" : "eye"}
                      size={24}
                      color="#ccc"
                      onPress={() => {
                        toggleShowPassword();
                      }}
                    />
                  </View>
                </View>
                <View className="mt-[30px]">
                  <View className=" pr- w-full self-center">
                    <TouchableOpacity
                      disabled={buttonClick}
                      onPress={() => {
                        onLoginClick();
                      }}
                    >
                      <View className="w-full h-[48px] mt-2 flex justify-center cursor-pointer rounded-[24px] bg-buttonColor hover:bg-buttonHover">
                        <Text
                          style={GlobalStyle.sstbold}
                          className="text-center leading-[24px] text-[16px] self-center text-[#fff]"
                        >
                          {i18n.t("submit")}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("ExtensionDirectory")}
                >
                  <View className="mt-[15px] self-center flex flex-row">
                    <Entypo
                      name="old-phone"
                      size={24}
                      color="#545b62"
                    />
                    <Text className="text-textLightBlack text-[20px] ml-[5px] font-bold">
                      {i18n.t("telephone-directory")}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}
