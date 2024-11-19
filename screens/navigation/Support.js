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
import * as ApiService from "../../config/config";
import apiList from "../../config/apiList.json";
import GlobalStyle from "../../hooks/GlobalStyle";
import {
  Ionicons,
  Entypo,
  FontAwesome6,
  MaterialCommunityIcons,
  Fontisto,
  MaterialIcons,
} from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import Loading from "../../components/loading/Loading";

export default function Support({ navigation }) {
  const [listData, setListData] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState("");
  const [searchButton, setSearchButton] = useState(false);

  useEffect(() => {
    if (listData == null) {
      getUser();
    }
  }, []);
  const ItemView = ({ item }) => {
    //console.log(item);
    return (
      // Single Comes here which will be repeatative for the FlatListItems
      <TouchableOpacity
        className="bg-[#fff]  rounded-[10px] border-[1px] border-buttonColor/40"
        onPress={() => {}}
      >
        <View className="bg-white pt-[10px] pb-[5px] ml-[10px] mr-[10px] justify-center">
          <View className="flex flex-row">
            <View className="flex">
              <FontAwesome6
                name="building-columns"
                size={20}
                color="#ab6a43"
              />
            </View>
            <View className="flex pl-[5px]">
              <Text
                style={GlobalStyle.sstbold}
                className="text-textLightBlack leading-[22px] text-[14px] "
              >
                {item.type}
              </Text>
            </View>
          </View>
          <View className="flex flex-row mt-[10px]">
            <View className="flex">
              <Entypo
                name="ticket"
                size={20}
                color="#ab6a43"
              />
            </View>
            <View className="flex pl-[5px]">
              <Text
                style={GlobalStyle.sstbold}
                className="text-textLightBlack leading-[22px] text-[14px] "
              >
                {item.controlid}
              </Text>
            </View>
          </View>
          <View className="flex flex-row mt-[10px]">
            <View className="flex">
              <Fontisto
                name="date"
                size={20}
                color="#ab6a43"
              />
            </View>
            <View className="flex pl-[5px]">
              <Text
                style={GlobalStyle.sstbold}
                className="text-textLightBlack leading-[22px] text-[14px] "
              >
                {item.datesubmitted}
              </Text>
            </View>
          </View>
          <View className="flex flex-row mt-[10px]">
            <View className="flex">
              <MaterialCommunityIcons
                name="format-list-bulleted-type"
                size={20}
                color="#ab6a43"
              />
            </View>
            <View className="flex pl-[5px]">
              <Text
                style={GlobalStyle.sstbold}
                className="text-textLightBlack leading-[22px] text-[14px] "
              >
                {item.problemtype}
              </Text>
            </View>
          </View>
          <View className="flex flex-row mt-[10px]">
            <View className="flex">
              <MaterialIcons
                name="details"
                size={20}
                color="#ab6a43"
              />
            </View>
            <View className="flex pl-[5px]">
              <Text
                style={GlobalStyle.sstbold}
                className="text-textLightBlack leading-[22px] text-[14px] "
              >
                {item.problemdesc}
              </Text>
            </View>
          </View>
          <View className="flex flex-row mt-[10px]">
            <View className="flex">
              <Entypo
                name="attachment"
                size={20}
                color="#ab6a43"
              />
            </View>
            <View className="flex pl-[5px]">
              <Text
                style={GlobalStyle.sstbold}
                className="text-textLightBlack leading-[22px] text-[14px] "
              >
                {item.attachment}
              </Text>
            </View>
          </View>
          <View className="flex flex-row mt-[10px]">
            <View className="flex">
              <MaterialCommunityIcons
                name="list-status"
                size={20}
                color="#ab6a43"
              />
            </View>
            <View className="flex pl-[5px]">
              <Text
                style={GlobalStyle.sstbold}
                className="text-textLightBlack leading-[22px] text-[14px] "
              >
                {item.status}
              </Text>
            </View>
          </View>
          <View className="flex flex-row mt-[10px]">
            <View className="flex">
              <MaterialIcons
                name="support-agent"
                size={20}
                color="#ab6a43"
              />
            </View>
            <View className="flex pl-[5px]">
              <Text
                style={GlobalStyle.sstbold}
                className="text-textLightBlack leading-[22px] text-[14px] "
              >
                {item.support}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const ItemSeparatorView = () => {
    return (
      //Item Separator
      <View style={{ height: 20, width: 1 }} />
    );
  };
  const getUser = async () => {
    let LoginUser = await SecureStore.getItemAsync("LoginUser");
    let userDetails = JSON.parse(LoginUser);
    let username = userDetails.Email.split("@");
    getData(userDetails.employee_code, username[0]);
  };
  const getData = async (employee_code, username) => {
    setLoading((loading) => true);
    const obj = JSON.stringify({
      employee_code: employee_code,
      username: username,
    });
    let params = { url: apiList.userTickets, body: obj };
    let response = await ApiService.postData(params);
    if (response.results.tickets.length > 0) {
      setLoading((loading) => false);
      //console.log(response.results.tickets);
      setListData(response.results.tickets);
      setFilterData((filterData) => response.results.tickets);
    }
  };
  const SearchFilter = (key) => {
    setLoading((loading) => true);
    if (!key) {
      setFilterData((filterData) => listData);
      setLoading((loading) => false);
      return;
    }
    const tickets = listData;
    const data = tickets.filter((k) => {
      if (
        (k.controlid != null && k.controlid.trim().indexOf(key.trim()) >= 0) ||
        (k.problemtype != null &&
          k.problemtype
            .trim()
            .toLowerCase()
            .indexOf(key.trim().toLowerCase()) >= 0) ||
        (k.problemdesc != null &&
          k.problemdesc
            .trim()
            .toLowerCase()
            .indexOf(key.trim().toLowerCase()) >= 0) ||
        (k.status != null && k.status.trim().indexOf(key.trim()) >= 0) ||
        (k.type != null && k.type.trim().indexOf(key.trim()) >= 0) ||
        (k.support != null && k.support.trim().indexOf(key.trim()) >= 0)
      ) {
        return k;
      }
    });
    console.log(data);
    setFilterData((filterData) => data);
    setLoading((loading) => false);
  };
  return (
    <ImageBackground
      source={require("../../assets/background/gradient.jpg")}
      className="flex-1 w-full bg-cover justify-center "
    >
      <SafeAreaView
        style={GlobalStyle.droidSafeArea}
        className="ml-[10px] mr-[10px]"
      >
        {loading && <Loading />}
        <View className="flex mb-[40px]">
          <View className="absolute pt-[5px] w-full">
            <Text className="text-center text-headerText text-[20px] font-bold">
              Support
            </Text>
          </View>
          <View className="absolute left-[0px]">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AddTicket");
                console.log("hello");
              }}
              className="rounded-full p-[5px] bg-buttonColor/60"
            >
              <MaterialIcons
                name="add"
                size={20}
                color="white"
              />
            </TouchableOpacity>
          </View>
          <View className="absolute right-[0px]">
            <TouchableOpacity
              onPress={() => setSearchButton((searchButton) => !searchButton)}
              className={
                searchButton
                  ? "rounded-full p-[5px] bg-buttonColor/90"
                  : "rounded-full p-[5px] bg-buttonColor/60"
              }
            >
              <Ionicons
                name="search"
                size={20}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          className={
            searchButton
              ? "flex flex-row border-[1px] rounded-[10px]   border-buttonColor/60"
              : "  border-[1px] rounded-[10px] hidden  border-buttonColor/60"
          }
        >
          <TextInput
            placeholder=" Search...."
            onChangeText={(e) => setKey((key) => e)}
            value={key}
            // className="transition-all duration-200 ${searchButton ? opacity-100 : opacity-0}"
            className="h-[40px] w-[90%] pl-[10px]  "
          ></TextInput>
          <TouchableOpacity
            onPress={() => {
              SearchFilter(key);
            }}
            className="self-center"
          >
            <MaterialCommunityIcons
              name="card-search"
              size={30}
              color="#ab6a43"
            />
          </TouchableOpacity>
        </View>
        <View
          className={
            Platform.OS === "android" ? "flex  mt-[20px] " : "flex  mt-[20px] "
          }
        >
          <FlatList
            data={filterData}
            //data defined in constructor
            ItemSeparatorComponent={ItemSeparatorView}
            //Item Separator View
            renderItem={ItemView}
            contentContainerStyle={
              Platform.OS == "android"
                ? { paddingBottom: 140 }
                : { paddingBottom: 140 }
            }
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
