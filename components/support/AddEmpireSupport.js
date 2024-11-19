import { View, Text } from "react-native";
import React, { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
export default function AddEmpireSupport(props) {
  useEffect(() => {
    getUserDetails();
  });
  const getUserDetails = async () => {
    let LoginUser = await SecureStore.getItemAsync("LoginUser");
    let userDetails = await JSON.parse(LoginUser);
    console.log(userDetails);
  };
  return (
    <View>
      <Text>AddEmpireSupport</Text>
    </View>
  );
}
