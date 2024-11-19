import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Platform,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import config from "../../config/config.json";
import * as ApiService from "../../config/config";
import apiList from "../../config/apiList.json";
import GlobalStyle from "../../hooks/GlobalStyle";
import {
  Ionicons,
  Entypo,
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Loading from "../../components/loading/Loading";
import BackButton from "../../components/button/BackButton";
import moment from "moment";

export default function MeetingDetails(props) {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  useEffect(() => {
    if (props.route.params != null) {
      setDetails((details) => props.route.params);
    }
  }, [props]);
  return (
    <View className="flex-1 w-full bg-white  justify-center ">
      <SafeAreaView
        style={GlobalStyle.droidSafeArea}
        className="ml-[15px] mr-[15px]"
      >
        {loading && <Loading />}
        <View className="flex mb-[40px]">
          <View className="absolute pt-[5px] w-full">
            <Text className="text-center text-headerText text-[20px] font-bold">
              Meeting Details
            </Text>
          </View>
          <View className="absolute right-0">
            <BackButton nav={props.navigation} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
