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
import MeetingList from "../../components/meeting/MeetingList";
import CalendarView from "../../components/meeting/CalendarView";

export default function Meeting({ navigation }) {
  const [searchButton, setSearchButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [meetingtab, setMeetingTab] = useState(true);
  const [calendartab, setCalendarTab] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [meetingList, setMeetingList] = useState(null);
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    let LoginUser = await SecureStore.getItemAsync("LoginUser");
    let userDetails = await JSON.parse(LoginUser);
    setUserDetails(userDetails);
    getMeetingList(userDetails.employee_code);
  };
  const getMeetingList = async (employee_code) => {
    const obj = JSON.stringify({
      employee_code: "4183",
    });
    let params = { url: apiList.meetingList, body: obj };
    let response = await ApiService.postData(params);
    console.log(response);
    if (response.success) {
      if (response.results.length > 0) {
        setMeetingList(response.results);
      }
    }
  };

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
              Meeting List
            </Text>
          </View>
          <View className="absolute right-0">
            <BackButton nav={navigation} />
          </View>
          <View className="absolute left-[0px]">
            <TouchableOpacity
              onPress={() => setSearchButton((searchButton) => !searchButton)}
              className="rounded-full p-[5px] bg-buttonColor/60"
            >
              <MaterialIcons
                name="add"
                size={20}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex flex-row mt-[10px] bg-[#ffffff] rounded-[6px]">
          <View className="flex w-[50%]">
            <TouchableOpacity
              onPress={() => {
                setMeetingTab((meetingtab) => true);
                setCalendarTab((calendartab) => false);
              }}
              className={
                meetingtab
                  ? "w-[100%] pb-[10px] pt-[10px] bg-buttonColor rounded-tl-[6px] rounded-bl-[6px]"
                  : "w-[100%] pb-[10px] pt-[10px] bg-[#ffffff] rounded-tl-[6px] rounded-bl-[6px]"
              }
            >
              <Text
                className={
                  meetingtab
                    ? "text-center text-[9px] font-bold text-[#ffffff]"
                    : "text-center text-[9px] font-bold text-buttonColor"
                }
              >
                Meeting List
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex w-[50%]">
            <TouchableOpacity
              onPress={() => {
                setMeetingTab((meetingtab) => false);
                setCalendarTab((calendartab) => true);
              }}
              className={
                calendartab
                  ? "w-[100%] pb-[10px] pt-[10px] bg-buttonColor rounded-tr-[6px] rounded-br-[6px]"
                  : "w-[100%] pb-[10px] pt-[10px] bg-[#ffffff] rounded-tr-[6px] rounded-br-[6px]"
              }
            >
              <Text
                className={
                  calendartab
                    ? "text-center text-[9px] font-bold text-[#ffffff]"
                    : "text-center text-[9px] font-bold text-buttonColor"
                }
              >
                Calendar View
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-1 mt-[10px]  rounded-[6px]">
          {meetingtab && (
            <MeetingList
              nav={navigation}
              meetingData={meetingList}
            />
          )}

          {calendartab && (
            <CalendarView
              nav={navigation}
              meetingData={meetingList}
            />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}
