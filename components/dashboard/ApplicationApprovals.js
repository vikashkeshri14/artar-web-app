import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  MaterialIcons,
  FontAwesome,
  FontAwesome6,
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import * as ApiService from "../../config/config";
import apiList from "../../config/apiList.json";
import Loading from "../loading/Loading";
export default function ApplicationApprovals(props) {
  const [userDetails, setUserDetails] = useState(null);
  const [applicationList, setApplicationList] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setUserDetails((userDetails) => props.userDetails);
    getApplicationList(
      props.userDetails.employee_code,
      props.userDetails.Email
    );
  }, []);
  const getApplicationList = async (empCode, email) => {
    setLoading(true);
    const obj = JSON.stringify({
      employee_code: empCode,
      email: email,
    });
    let params = { url: apiList.userApplicationList, body: obj };
    let response = await ApiService.postData(params);
    if (response.success) {
      setLoading((loading) => false);
      if (response.results) {
        setApplicationList(response.results);
      }
    }
  };
  return (
    <View className="flex p-[5px] pb-[20px] bg-[#ffffff] rounded-[6px]">
      {loading && <Loading />}
      <View className="flex  mt-[15px] border-[1px] border-[#ccc] rounded-[6px]">
        <View className="flex flex-row p-[8px] bg-[#00000008] w-full">
          <View className="flex">
            <MaterialCommunityIcons
              name="lan-pending"
              size={20}
              color="#545b62"
            />
          </View>
          <View className="flex ml-[5px]">
            <Text className="text-textLightBlack font-bold">Pending</Text>
          </View>
          <View className="flex bg-[#ffc107] rounded-full pl-[8px] pr-[8px]  ml-[10px]">
            <Text className="text-[#fff]  font-bold">
              {applicationList != null && applicationList.pendingcounter}
            </Text>
          </View>
        </View>
        <View className="h-[60px]   w-full rounded-[6px] bg-[#fff]">
          <View className="flex mt-[10px] ml-[10px]">
            <TouchableOpacity className="bg-buttonColor flex flex-row rounded-[10px] w-[90px] p-[8px] ">
              <Text className="text-[#fff] font-bold">View</Text>
              <View className="flex bg-[#ffc107] rounded-full pl-[8px] pr-[8px]  ml-[10px]">
                <Text className="text-[#fff]  font-bold">
                  {applicationList != null && applicationList.pendingcounter}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="flex  mt-[25px] border-[1px] border-[#ccc] rounded-[6px]">
        <View className="flex flex-row p-[8px] bg-[#00000008] w-full">
          <View className="flex">
            <MaterialCommunityIcons
              name="lan-pending"
              size={20}
              color="#28a745"
            />
          </View>
          <View className="flex ml-[5px]">
            <Text className="text-[#28a745] font-bold">Approved</Text>
          </View>
          <View className="flex bg-[#6c757d] rounded-full pl-[8px] pr-[8px]  ml-[10px]">
            <Text className="text-[#fff]  font-bold">
              {applicationList != null && applicationList.approvedCounter}
            </Text>
          </View>
        </View>
        <View className="h-[60px]   w-full rounded-[6px] bg-[#fff]">
          <View className="flex mt-[10px] ml-[10px]">
            <TouchableOpacity className="bg-[#28a745] flex flex-row rounded-[10px] w-[90px] p-[8px] ">
              <Text className="text-[#fff] font-bold">View</Text>
              <View className="flex bg-[#6c757d] rounded-full pl-[8px] pr-[8px]  ml-[10px]">
                <Text className="text-[#fff]  font-bold">
                  {applicationList != null && applicationList.approvedCounter}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="flex  mt-[25px] border-[1px] border-[#ccc] rounded-[6px]">
        <View className="flex flex-row p-[8px] bg-[#00000008] w-full">
          <View className="flex">
            <MaterialCommunityIcons
              name="lan-pending"
              size={20}
              color="#dc3545"
            />
          </View>
          <View className="flex ml-[5px]">
            <Text className="text-[#dc3545] font-bold">Rejected</Text>
          </View>
          <View className="flex bg-[#6c757d] rounded-full pl-[8px] pr-[8px]  ml-[10px]">
            <Text className="text-[#fff]  font-bold">
              {applicationList != null && applicationList.rejectedCounter}
            </Text>
          </View>
        </View>
        <View className="h-[60px]   w-full rounded-[6px] bg-[#fff]">
          <View className="flex mt-[10px] ml-[10px]">
            <TouchableOpacity className="bg-[#dc3545] flex flex-row rounded-[10px] w-[90px] p-[8px] ">
              <Text className="text-[#fff] font-bold">View</Text>
              <View className="flex bg-[#6c757d] rounded-full pl-[8px] pr-[8px]  ml-[10px]">
                <Text className="text-[#fff]  font-bold">
                  {applicationList != null && applicationList.rejectedCounter}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
