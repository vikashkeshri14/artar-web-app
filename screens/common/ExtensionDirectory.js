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
} from "@expo/vector-icons";
import Loading from "../../components/loading/Loading";
import BackButton from "../../components/button/BackButton";
export default function ExtensionDirectory({ navigation }) {
  const [listDirectory, setListDirectory] = useState([]);
  const [filterDirectory, setFilterDirectory] = useState(null);
  const [searchButton, setSearchButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState("");
  useEffect(() => {
    if (filterDirectory == null) {
      getData();
    }
  }, [filterDirectory]);
  const getData = async () => {
    let params = { url: apiList.extensionDirectory };
    let response = await ApiService.getData(params);
    if (response.data.length > 0) {
      setListDirectory(response.data);
      setFilterDirectory(response.data);
    }
    //console.log(response);
  };

  const SearchFilter = (key) => {
    setLoading((loading) => true);

    if (!key) {
      setFilterDirectory((filterDirectory) => listDirectory);
      setLoading((loading) => false);
      return;
    }
    const director = listDirectory;
    const data = director.filter((k) => {
      if (
        (k.MenaID != null && k.MenaID.trim().indexOf(key.trim()) >= 0) ||
        (k.ename_a != null &&
          k.ename_a.trim().toLowerCase().indexOf(key.trim().toLowerCase()) >=
            0) ||
        (k.ename_e != null &&
          k.ename_e.trim().toLowerCase().indexOf(key.trim().toLowerCase()) >=
            0) ||
        (k.Ext_No != null && k.Ext_No.trim().indexOf(key.trim()) >= 0)
      ) {
        return k;
      }
    });
    // console.log(data);
    setFilterDirectory((filterDirectory) => data);
    setLoading((loading) => false);
  };
  const ItemView = ({ item }) => {
    //console.log(item);
    return (
      // Single Comes here which will be repeatative for the FlatListItems
      <TouchableOpacity
        className="bg-white h-[130px] rounded-[10px] border-[1px] border-buttonColor/40"
        onPress={() => {}}
      >
        <View className="bg-white pt-[10px] pb-[5px] ml-[10px] mr-[10px] justify-center">
          <View className="flex flex-row">
            <View className="flex">
              <Entypo
                name="user"
                size={20}
                color="#ab6a43"
              />
            </View>
            <View className="flex pl-[5px]">
              <Text
                style={GlobalStyle.sstbold}
                className="text-textLightBlack leading-[22px] text-[14px] "
              >
                {item.ename_e}
              </Text>
            </View>
          </View>
          <View className="flex flex-row mt-[10px]">
            <View className="flex">
              <Entypo
                name="old-phone"
                size={20}
                color="#ab6a43"
              />
            </View>
            <View className="flex pl-[5px]">
              <Text
                style={GlobalStyle.sstbold}
                className="text-textLightBlack leading-[22px] text-[14px] "
              >
                {item.Ext_No}
              </Text>
            </View>
          </View>
          <View className="flex flex-row mt-[10px]">
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
                {item.Department}
              </Text>
            </View>
          </View>
          <View className="flex flex-row mt-[10px]">
            <View className="flex">
              <Entypo
                name="v-card"
                size={20}
                color="#ab6a43"
              />
            </View>
            <View className="flex pl-[5px]">
              <Text
                style={GlobalStyle.sstbold}
                className="text-textLightBlack leading-[22px] text-[14px] "
              >
                {item.MenaID}
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
              Telephone Directory
            </Text>
          </View>
          <View className="absolute left-0">
            <BackButton nav={navigation} />
          </View>
          <View className="absolute right-[0px]">
            <TouchableOpacity
              onPress={() => setSearchButton((searchButton) => !searchButton)}
              className="rounded-full p-[5px] bg-buttonColor/60"
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
            data={filterDirectory}
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
      </SafeAreaView>
    </View>
  );
}
