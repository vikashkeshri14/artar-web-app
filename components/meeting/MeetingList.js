import { View, Text, FlatList, TouchableOpacity, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Ionicons,
  Entypo,
  FontAwesome6,
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import GlobalStyle from "../../hooks/GlobalStyle";
import moment from "moment";
export default function MeetingList(props) {
  const [meetingList, setMeetingList] = useState([]);
  useEffect(() => {
    if (props.meetingData != null && props.meetingData.length > 0) {
      setMeetingList(props.meetingData);
    }
  }, [props.meetingData]);
  const ItemView = ({ item }) => {
    //console.log(item);
    return (
      // Single Comes here which will be repeatative for the FlatListItems
      <View className=" h-auto  border-buttonColor/40">
        <View className="w-[50%] h-[30px] bg-[#f1e8d8] rounded-tl-[20px] rounded-tr-[20px] rounded-br-[-5px]"></View>
        <View className="pt-[10px] bg-[#f1e8d8] pb-[5px] pl-[10px]  rounded-bl-[20px] rounded-tr-[20px]  justify-center">
          <View className="flex flex-row">
            <View className="flex pl-[5px]">
              <Text
                style={GlobalStyle.sstbold}
                className="text-textLightBlack font-bold text-[16px] "
              >
                {item.meeting_location}
              </Text>
              <Text
                style={GlobalStyle.sstbold}
                className="text-textLightBlack font-bold text-[14px] "
              >
                {item.heading}
              </Text>
            </View>
          </View>
          <View className="flex flex-row mt-[5px]">
            <View className="flex flex-row pl-[5px]">
              <Text
                style={GlobalStyle.sstbold}
                className="text-textLightBlack font-bold leading-[18px] text-[10px] "
              >
                {item.organizer_id.employee_name_eng}
              </Text>
              <Text
                style={GlobalStyle.sstbold}
                className="text-textLightBlack pl-[10px] font-normal leading-[18px] text-[10px] "
              >
                {item.organizer_id.email}
              </Text>
            </View>
          </View>
          <View className="flex flex-row  mt-[5px]">
            <View className="pl-[5px] self-center">
              <MaterialCommunityIcons
                name="calendar-clock-outline"
                size={16}
                color="#ab6a43"
              />
            </View>
            <View className="flex pl-[5px] self-center">
              <Text
                style={GlobalStyle.sstbold}
                className="text-textLightBlack leading-[22px] text-[10px] "
              >
                {moment(item.datefromtodateto[0].booked_datetime_from).format(
                  "LL"
                )}
              </Text>
            </View>
            <View className="flex self-center ml-[5px]">
              <MaterialCommunityIcons
                name="clock-time-three"
                size={16}
                color="#ab6a43"
              />
            </View>
            <View className="flex pl-[5px] self-center">
              <Text
                style={GlobalStyle.sstbold}
                className="text-textLightBlack leading-[22px] text-[10px] "
              >
                {moment(item.datefromtodateto[0].booked_datetime_from).format(
                  "LT"
                )}{" "}
                {"-"}{" "}
                {moment(item.datefromtodateto[0].booked_datetime_to).format(
                  "LT"
                )}
              </Text>
            </View>
          </View>
        </View>

        <View className="absolute bottom-0 right-0">
          <TouchableOpacity
            className="bg-buttonColor/20 pl-[15px] pr-[15px] pt-[10px] pb-[10px]  rounded-tl-[15px]"
            onPress={() => {
              props.nav.navigate("MeetingDetails", { meetingDetails: item });
            }}
          >
            <MaterialCommunityIcons
              name="clipboard-search"
              size={16}
              color="#ab6a43"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const ItemSeparatorView = () => {
    return (
      //Item Separator
      <View style={{ height: 20, width: 1 }} />
    );
  };
  return (
    <View className="flex  mt-[20px] ">
      <FlatList
        data={meetingList}
        //data defined in constructor
        ItemSeparatorComponent={ItemSeparatorView}
        //Item Separator View
        renderItem={ItemView}
        contentContainerStyle={
          Platform.OS == "android"
            ? { paddingBottom: 30 }
            : { paddingBottom: 30 }
        }
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
