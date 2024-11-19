import { View, Text, FlatList, Platform } from "react-native";
import React, { useEffect, useState } from "react";

import {
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
  AntDesign,
  Entypo,
} from "@expo/vector-icons";
import * as ApiService from "../../config/config";
import apiList from "../../config/apiList.json";
import Loading from "../loading/Loading";
export default function Assets(props) {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    setUserDetails((userDetails) => props.userDetails);
    getListItem(props.userDetails.employee_code);
  }, []);
  const ItemSeparator = () => {
    return (
      //Item Separator
      <View style={{ height: 20, width: 1 }} />
    );
  };
  const getListItem = async (empCode) => {
    setLoading(true);
    const obj = JSON.stringify({
      employee_code: empCode,
    });
    let params = { url: apiList.userAssetsInformation, body: obj };
    let response = await ApiService.postData(params);
    if (response.success) {
      setLoading((loading) => false);
      if (response.results.employeeAssetData) {
        setListItems(response.results.employeeAssetData);
      }
    }
  };
  const listItem = ({ item }) => {
    return (
      <View className="flex flex-col bg-[#ffffff] p-[10px] border-[1px] border-buttonColor/40 rounded-[20px]">
        <View className="flex flex-row">
          <View className="flex">
            <FontAwesome
              name="codepen"
              size={16}
              color="#ab6a43"
            />
          </View>
          <View className="flex ml-[5px]">
            <Text className="text-[12px] text-textLightBlack font-bold">
              Asset Code ::
            </Text>
          </View>
          <View className="flex ml-[5px]">
            <Text className="text-[12px] text-textLightBlack font-bold">
              {item.IDNo}
            </Text>
          </View>
        </View>
        <View className="flex flex-row mt-[10px]">
          <View className="flex">
            <MaterialIcons
              name="category"
              size={20}
              color="#ab6a43"
            />
          </View>
          <View className="flex ml-[5px]">
            <Text className="text-[12px] text-textLightBlack font-bold">
              Category ::
            </Text>
          </View>
          <View className="flex ml-[5px]">
            <Text className="text-[12px] text-textLightBlack font-bold">
              {item.Category}
            </Text>
          </View>
        </View>
        <View className="flex flex-row mt-[10px]">
          <View className="flex">
            <MaterialIcons
              name="description"
              size={20}
              color="#ab6a43"
            />
          </View>
          <View className="flex ml-[5px]">
            <Text className="text-[12px] text-textLightBlack font-bold">
              Description ::
            </Text>
          </View>
          <View className="flex ml-[5px]">
            <Text className="text-[12px] text-textLightBlack font-bold">
              {item.Description}
            </Text>
          </View>
        </View>
        <View className="flex flex-row mt-[10px]">
          <View className="flex">
            <MaterialCommunityIcons
              name="globe-model"
              size={20}
              color="#ab6a43"
            />
          </View>
          <View className="flex ml-[5px]">
            <Text className="text-[12px] text-textLightBlack font-bold">
              Model ::
            </Text>
          </View>
          <View className="flex ml-[5px]">
            <Text className="text-[12px] text-textLightBlack font-bold">
              {item.Model}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View className="flex mt-4">
      {loading && <Loading />}
      <FlatList
        data={listItems}
        horizontal={false}
        //data defined in constructor
        ItemSeparatorComponent={ItemSeparator}
        //Item Separator View
        contentContainerStyle={
          Platform.OS == "android"
            ? { paddingBottom: 300 }
            : { paddingBottom: 280 }
        }
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={listItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
