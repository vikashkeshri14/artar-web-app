import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import config from "../../config/config.json";
import * as ApiService from "../../config/config";
import apiList from "../../config/apiList.json";
import GlobalStyle from "../../hooks/GlobalStyle";
import { FontAwesome5 } from "@expo/vector-icons";
import PersonalDetails from "../../components/dashboard/PersonalDetails";
import ApplicationApprovals from "../../components/dashboard/ApplicationApprovals";
import Assets from "../../components/dashboard/Assets";
export default function Dashboard() {
  const [userDetails, setUserDetails] = useState([]);
  const [empImage, setEmpImage] = useState(null);
  const [empDetails, setEmpDetails] = useState([]);
  const [personalTab, setPersonalTab] = useState(true);
  const [applicationTab, setApplicationTab] = useState(false);
  const [assetTab, setAssetTab] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    let LoginUser = await SecureStore.getItemAsync("LoginUser");
    let userDetails = await JSON.parse(LoginUser);
    console.log(userDetails);
    setUserDetails(userDetails);
    getProfileDetails(userDetails.employee_code);
    console.log(userDetails);
  };
  const getProfileDetails = async (empCode) => {
    const obj = JSON.stringify({
      employee_code: empCode,
    });
    let params = { url: apiList.userDetails, body: obj };
    let response = await ApiService.postData(params);
    if (response.success) {
      if (response.results.employeeImage) {
        setEmpImage(response.results.employeeImage);
      }
      if (response.results.employeeData) {
        setEmpDetails(response.results.employeeData);
      }
    }
    //console.log(response);
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
        <View className="flex mt-[10px] items-center w-full">
          {empImage != null ? (
            <Image
              className="w-[120px] h-[120px] object-cover  rounded-full"
              source={{
                uri:
                  config.imgUri +
                  "/app/profile_images/" +
                  userDetails.employee_code +
                  "-profile_image_mena.jpg",
              }}
            />
          ) : (
            <FontAwesome5
              name="user-tie"
              size={120}
              color="#ab6a43"
            />
          )}
        </View>
        <View className="flex w-full mt-[10px]">
          <Text className="text-center font-bold text-textDark">
            {empDetails.length > 0 && empDetails[0].Employee_Name_1_English}
          </Text>
          <Text
            style={GlobalStyle.sstmedium}
            className="text-center leading-5 text-textDark"
          >
            {empDetails.length > 0 && empDetails[0].Employee_Name_1_Arabic}
          </Text>
        </View>
        <View className="flex flex-row mt-[10px] bg-[#ffffff] rounded-[6px]">
          <View className="flex w-[33.3%]">
            <TouchableOpacity
              onPress={() => {
                setPersonalTab((personalTab) => true);
                setAssetTab((assetTab) => false);
                setApplicationTab((applicationTab) => false);
              }}
              className={
                personalTab
                  ? "w-[100%] pb-[10px] pt-[10px] bg-buttonColor rounded-tl-[6px] rounded-bl-[6px]"
                  : "w-[100%] pb-[10px] pt-[10px] bg-[#ffffff] rounded-tl-[6px] rounded-bl-[6px]"
              }
            >
              <Text
                className={
                  personalTab
                    ? "text-center text-[9px] font-bold text-[#ffffff]"
                    : "text-center text-[9px] font-bold text-buttonColor"
                }
              >
                Personal Details
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex w-[33.4%]">
            <TouchableOpacity
              onPress={() => {
                setPersonalTab((personalTab) => false);
                setAssetTab((assetTab) => false);
                setApplicationTab((applicationTab) => true);
              }}
              className={
                applicationTab
                  ? "w-[100%] pb-[10px] pt-[10px] bg-buttonColor"
                  : "w-[100%] pb-[10px] pt-[10px] bg-[#ffffff]"
              }
            >
              <Text
                className={
                  applicationTab
                    ? "text-center text-[9px] font-bold text-[#ffffff]"
                    : "text-center text-[9px] font-bold text-buttonColor"
                }
              >
                Applications Approvals
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex w-[33.3%]">
            <TouchableOpacity
              onPress={() => {
                setPersonalTab((personalTab) => false);
                setAssetTab((assetTab) => true);
                setApplicationTab((applicationTab) => false);
              }}
              className={
                assetTab
                  ? "w-[100%] pb-[10px] pt-[10px] bg-buttonColor rounded-tr-[6px] rounded-br-[6px]"
                  : "w-[100%] pb-[10px] pt-[10px] bg-[#ffffff] rounded-tr-[6px] rounded-br-[6px]"
              }
            >
              <Text
                className={
                  assetTab
                    ? "text-center text-[9px] font-bold text-[#ffffff]"
                    : "text-center text-[9px] font-bold text-buttonColor"
                }
              >
                My Assets
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-1 mt-[10px]">
          {personalTab && (
            <PersonalDetails
              userDetails={userDetails}
              empDetails={empDetails}
            />
          )}
          {applicationTab && <ApplicationApprovals userDetails={userDetails} />}
          {assetTab && <Assets userDetails={userDetails} />}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
