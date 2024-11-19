import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
export default function BackButton(route) {
  //console.log(route);
  return (
    <View>
      <TouchableOpacity
        className="rounded-full p-[5px] bg-buttonColor/60"
        onPress={() => route.nav.goBack(null)}
      >
        <AntDesign
          name="arrowright"
          size={20}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
}
