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
import * as SecureStore from "expo-secure-store";
import GlobalStyle from "../../hooks/GlobalStyle";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
export default function AddArtarSupport(props) {
  useEffect(() => {
    getUserDetails();
  });
  const getUserDetails = async () => {
    let LoginUser = await SecureStore.getItemAsync("LoginUser");
    let userDetails = await JSON.parse(LoginUser);
    console.log(userDetails);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
      keyboardVerticalOffset={40}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View className="flex flex-row  rounded-[15px] bg-[#fff] border border-red pl-[15px] pr-[15px]  h-[48px]">
            <View className="justify-center">
              <Entypo
                name="user"
                size={24}
                color="#ccc"
              />
            </View>
            <TextInput
              value={Id}
              readOnly={true}
              returnKeyType="done"
              maxLength={10}
              style={GlobalStyle.sstmedium}
              className="pl-[15px] pr-3 w-[85%] text-[17px] text-headerText"
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
