import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Platform,
  TextInput,
  ScrollView,
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
  AntDesign,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import Loading from "../../components/loading/Loading";

export default function Settings({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [generalClick, setGeneralClick] = useState(false);
  const [employeeClick, setEmployeeClick] = useState(false);
  const [documentClick, setDocumentClick] = useState(false);
  const [facilityClick, setFacilityClick] = useState(false);
  const [telecomClick, setTelecomClick] = useState(false);
  const [assetClick, setAssetClick] = useState(false);
  const [rosterClick, setRosterClick] = useState(false);
  const [accountClick, setAccountClick] = useState(false);
  const [procurementClick, setProcurementClick] = useState(false);
  const [helpdeskClick, setHelpdeskClick] = useState(false);
  const [administratorClick, setAdministratorClick] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    let LoginUser = await SecureStore.getItemAsync("LoginUser");
    let userDetails = JSON.parse(LoginUser);
    console.log(userDetails);
  };
  const signout = async () => {
    setLoading(true);
    SecureStore.deleteItemAsync("LoginUser").then(() => {
      navigation.navigate("Login");
      setLoading((loading) => false);
    });
  };
  return (
    <ImageBackground
      source={require("../../assets/background/gradient.jpg")}
      className="flex-1 w-full bg-cover justify-center "
    >
      <SafeAreaView
        style={GlobalStyle.droidSafeArea}
        className=""
      >
        {loading && <Loading />}
        <View className="flex mb-[40px] ml-[10px] mr-[10px]">
          <View className="absolute pt-[5px] w-full">
            <Text className="text-center text-headerText text-[20px] font-bold">
              Settings
            </Text>
          </View>
          <View className="absolute right-[0px]">
            <TouchableOpacity
              onPress={() => {
                //signout();
              }}
              className="rounded-full p-[5px] bg-buttonColor/60"
            >
              <FontAwesome5
                name="user-alt"
                size={20}
                color="white"
              />
            </TouchableOpacity>
          </View>
          <View className="absolute left-[0px]">
            <TouchableOpacity
              onPress={() => {
                signout();
              }}
              className="rounded-full p-[5px] bg-buttonColor/60"
            >
              <FontAwesome
                name="sign-out"
                size={20}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex bg-[#f1f5f9] ml-[5px] mr-[5px] p-[15px] pb-[25px] mb-[90px] h-auto rounded-[10px]">
            <View className="bg-[#fff] flex flex-col rounded-[10px] p-[10px] h-auto">
              <View className="flex">
                <TouchableOpacity
                  className="flex flex-row"
                  onPress={() => {
                    setGeneralClick((generalClick) => !generalClick);
                  }}
                >
                  <View className="self-center">
                    <FontAwesome6
                      name="bars-staggered"
                      size={18}
                      color="#e3a37d"
                    />
                  </View>
                  <View className="w-[100%] pl-[10px] ">
                    <Text className="font-bold text-headerText text-[16px]">
                      General Section
                    </Text>
                  </View>
                  <View className="absolute right-0">
                    <AntDesign
                      name={generalClick ? "minuscircle" : "pluscircle"}
                      size={20}
                      color="#ab6a43"
                    />
                  </View>
                </TouchableOpacity>
              </View>
              {generalClick && (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Meeting");
                  }}
                >
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <FontAwesome6
                        name="users-line"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Meeting
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            </View>
            <View className="bg-[#fff] flex flex-col mt-[15px] rounded-[10px] p-[10px] h-auto">
              <View className="flex">
                <TouchableOpacity
                  className="flex flex-row"
                  onPress={() => {
                    setEmployeeClick((employeeClick) => !employeeClick);
                  }}
                >
                  <View className="self-center">
                    <FontAwesome5
                      name="users-cog"
                      size={18}
                      color="#e3a37d"
                    />
                  </View>
                  <View className="w-[100%] pl-[10px]">
                    <Text className="font-bold text-headerText text-[16px]">
                      Employees Information
                    </Text>
                  </View>
                  <View className="absolute right-0">
                    <AntDesign
                      name={employeeClick ? "minuscircle" : "pluscircle"}
                      size={20}
                      color="#ab6a43"
                    />
                  </View>
                </TouchableOpacity>
              </View>
              {employeeClick && (
                <>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <TouchableOpacity
                      className="flex flex-row "
                      onPress={() => {
                        navigation.navigate("EmployeeStatus");
                      }}
                    >
                      <View className="self-center">
                        <MaterialCommunityIcons
                          name="list-status"
                          size={16}
                          color="#e3a37d"
                        />
                      </View>
                      <View className="w-[100%] pl-[10px] ">
                        <Text className="font-normal text-headerText text-[14px]">
                          Employees Status
                        </Text>
                      </View>
                      <View className="absolute self-center right-[8px]">
                        <Entypo
                          name="chevron-small-right"
                          size={24}
                          color="#ab6a43"
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[10px] ml-[40px]">
                    <TouchableOpacity
                      className="flex flex-row "
                      onPress={() => {
                        navigation.navigate("ActiveDirectory");
                      }}
                    >
                      <View className="self-center">
                        <MaterialCommunityIcons
                          name="family-tree"
                          size={16}
                          color="#e3a37d"
                        />
                      </View>
                      <View className="w-[100%] pl-[10px] ">
                        <Text className="font-normal text-headerText text-[14px]">
                          Active Directive
                        </Text>
                      </View>
                      <View className="absolute self-center right-[8px]">
                        <Entypo
                          name="chevron-small-right"
                          size={24}
                          color="#ab6a43"
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[10px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="server-security"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        MENA Security
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[10px] ml-[40px]">
                    <View className="self-center">
                      <FontAwesome5
                        name="id-card"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        ID Card
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[10px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="car-brake-parking"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Employee Parking
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[10px] ml-[40px]">
                    <View className="self-center">
                      <AntDesign
                        name="qrcode"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Employee QR Card
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                </>
              )}
            </View>
            <View className="bg-[#fff] flex flex-col mt-[15px] rounded-[10px] p-[10px] h-auto">
              <View className="flex">
                <TouchableOpacity
                  onPress={() => {
                    setDocumentClick((documentClick) => !documentClick);
                  }}
                  className="flex flex-row"
                >
                  <View className="self-center">
                    <Ionicons
                      name="document-lock"
                      size={20}
                      color="#e3a37d"
                    />
                  </View>
                  <View className="w-[100%] pl-[10px]">
                    <Text className="font-bold text-headerText text-[16px]">
                      Document Expiry
                    </Text>
                  </View>
                  <View className="absolute right-0">
                    <AntDesign
                      name={documentClick ? "minuscircle" : "pluscircle"}
                      size={20}
                      color="#ab6a43"
                    />
                  </View>
                </TouchableOpacity>
              </View>
              {documentClick && (
                <>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        New Document
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Interval Setup
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        SMS Setup
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                </>
              )}
            </View>
            <View className="bg-[#fff] flex flex-col mt-[15px] rounded-[10px] p-[10px] h-auto">
              <View className="flex">
                <TouchableOpacity
                  onPress={() => {
                    setFacilityClick((facilityClick) => !facilityClick);
                  }}
                  className="flex flex-row"
                >
                  <View className="self-center">
                    <FontAwesome6
                      name="user-shield"
                      size={18}
                      color="#e3a37d"
                    />
                  </View>
                  <View className="w-[100%] pl-[10px]">
                    <Text className="font-bold text-headerText text-[16px]">
                      Facility Management
                    </Text>
                  </View>
                  <View className="absolute right-0">
                    <AntDesign
                      name={facilityClick ? "minuscircle" : "pluscircle"}
                      size={20}
                      color="#ab6a43"
                    />
                  </View>
                </TouchableOpacity>
              </View>
              {facilityClick && (
                <>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Bank Facility Agreement
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Loan Summary
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        LG Summary
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        LC Summary
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Bank Over Draft
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        LG in our favour
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        LC in our favour
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Finance Request
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Reports
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Facility Agreement Reports
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                </>
              )}
            </View>

            <View className="bg-[#fff] flex flex-col mt-[15px] rounded-[10px] p-[10px] h-auto">
              <View className="flex">
                <TouchableOpacity
                  onPress={() => {
                    setTelecomClick((telecomClick) => !telecomClick);
                  }}
                  className="flex flex-row"
                >
                  <View className="self-center">
                    <FontAwesome6
                      name="tower-cell"
                      size={18}
                      color="#e3a37d"
                    />
                  </View>
                  <View className="w-[100%] pl-[10px]">
                    <Text className="font-bold text-headerText text-[16px]">
                      Telecom
                    </Text>
                  </View>
                  <View className="absolute right-0">
                    <AntDesign
                      name={telecomClick ? "minuscircle" : "pluscircle"}
                      size={20}
                      color="#ab6a43"
                    />
                  </View>
                </TouchableOpacity>
              </View>
              {telecomClick && (
                <>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        General
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Ext Directory
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Reports
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Setup
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                </>
              )}
            </View>
            <View className="bg-[#fff] flex flex-col mt-[15px] rounded-[10px] p-[10px] h-auto">
              <View className="flex">
                <TouchableOpacity
                  onPress={() => {
                    setAssetClick((assetClick) => !assetClick);
                  }}
                  className="flex flex-row"
                >
                  <View className="self-center">
                    <MaterialCommunityIcons
                      name="finance"
                      size={20}
                      color="#e3a37d"
                    />
                  </View>
                  <View className="w-[100%] pl-[10px]">
                    <Text className="font-bold text-headerText text-[16px]">
                      IT Assets
                    </Text>
                  </View>
                  <View className="absolute right-0">
                    <AntDesign
                      name={assetClick ? "minuscircle" : "pluscircle"}
                      size={20}
                      color="#ab6a43"
                    />
                  </View>
                </TouchableOpacity>
              </View>
              {assetClick && (
                <>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        General
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Clearance
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Transfer
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Delivery Note
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Bravo
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Reports
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Setup
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                </>
              )}
            </View>
            <View className="bg-[#fff] flex flex-col mt-[15px] rounded-[10px] p-[10px] h-auto">
              <View className="flex ">
                <TouchableOpacity
                  onPress={() => {
                    setRosterClick((rosterClick) => !rosterClick);
                  }}
                  className="flex flex-row"
                >
                  <View className="self-center">
                    <FontAwesome6
                      name="timeline"
                      size={16}
                      color="#e3a37d"
                    />
                  </View>
                  <View className="w-[100%] pl-[10px]">
                    <Text className="font-bold text-headerText text-[16px]">
                      Roster
                    </Text>
                  </View>
                  <View className="absolute right-0">
                    <AntDesign
                      name={rosterClick ? "minuscircle" : "pluscircle"}
                      size={20}
                      color="#ab6a43"
                    />
                  </View>
                </TouchableOpacity>
              </View>
              {rosterClick && (
                <>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Employees
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Department Schedule
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Department Groupings
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Email Setup
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        E-Report Scheduler
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        History
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Ramadan
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Inactive
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Holidays
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Reports
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Permissions
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                </>
              )}
            </View>
            <View className="bg-[#fff] flex flex-col mt-[15px] rounded-[10px] p-[10px] h-auto">
              <View className="flex">
                <TouchableOpacity
                  onPress={() => {
                    setAccountClick((accountClick) => !accountClick);
                  }}
                  className="flex flex-row"
                >
                  <View className="self-center">
                    <MaterialIcons
                      name="account-balance"
                      size={20}
                      color="#e3a37d"
                    />
                  </View>
                  <View className="w-[100%] pl-[10px]">
                    <Text className="font-bold text-headerText text-[16px]">
                      IT Accounting
                    </Text>
                  </View>
                  <View className="absolute right-0">
                    <AntDesign
                      name={accountClick ? "minuscircle" : "pluscircle"}
                      size={20}
                      color="#ab6a43"
                    />
                  </View>
                </TouchableOpacity>
              </View>
              {accountClick && (
                <>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        GatePass Request
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        It Reports
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Custom Report
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Asset Summary Report
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Setup
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                </>
              )}
            </View>
            <View className="bg-[#fff] flex flex-col mt-[15px] rounded-[10px] p-[10px] h-auto">
              <View className="flex">
                <TouchableOpacity
                  onPress={() => {
                    setProcurementClick(
                      (procurementClick) => !procurementClick
                    );
                  }}
                  className="flex flex-row"
                >
                  <View className="self-center">
                    <MaterialIcons
                      name="manage-history"
                      size={20}
                      color="#e3a37d"
                    />
                  </View>
                  <View className="w-[100%] pl-[10px]">
                    <Text className="font-bold text-headerText text-[16px]">
                      Procurement
                    </Text>
                  </View>
                  <View className="absolute right-0">
                    <AntDesign
                      name={procurementClick ? "minuscircle" : "pluscircle"}
                      size={20}
                      color="#ab6a43"
                    />
                  </View>
                </TouchableOpacity>
              </View>
              {procurementClick && (
                <>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Requisition
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Purchase Order
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        PrePayment
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Supplier
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Email Logs
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                </>
              )}
            </View>
            <View className="bg-[#fff] flex flex-col mt-[15px] rounded-[10px] p-[10px] h-auto">
              <View className="flex">
                <TouchableOpacity
                  onPress={() => {
                    setHelpdeskClick((helpdeskClick) => !helpdeskClick);
                  }}
                  className="flex flex-row"
                >
                  <View className="self-center">
                    <Ionicons
                      name="help-buoy-sharp"
                      size={20}
                      color="#e3a37d"
                    />
                  </View>
                  <View className="w-[100%] pl-[10px]">
                    <Text className="font-bold text-headerText text-[16px]">
                      IT Help Desk
                    </Text>
                  </View>
                  <View className="absolute right-0">
                    <AntDesign
                      name={helpdeskClick ? "minuscircle" : "pluscircle"}
                      size={20}
                      color="#ab6a43"
                    />
                  </View>
                </TouchableOpacity>
              </View>
              {helpdeskClick && (
                <>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Task Management
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Tech. Support
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Task Archive
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Report
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Settings
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                </>
              )}
            </View>
            <View className="bg-[#fff] flex flex-col mt-[15px] rounded-[10px] p-[10px] h-auto">
              <View className="flex">
                <TouchableOpacity
                  onPress={() => {
                    setAdministratorClick(
                      (administratorClick) => !administratorClick
                    );
                  }}
                  className="flex flex-row"
                >
                  <View className="self-center">
                    <MaterialIcons
                      name="admin-panel-settings"
                      size={20}
                      color="#e3a37d"
                    />
                  </View>
                  <View className="w-[100%] pl-[10px]">
                    <Text className="font-bold text-headerText text-[16px]">
                      Administrator
                    </Text>
                  </View>
                  <View className="absolute right-0">
                    <AntDesign
                      name={administratorClick ? "minuscircle" : "pluscircle"}
                      size={20}
                      color="#ab6a43"
                    />
                  </View>
                </TouchableOpacity>
              </View>
              {administratorClick && (
                <>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Modules
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Sub Modules
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Privileges
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        User Group
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        Group Permissions
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                  <View className="flex bg-[#faf5f1] rounded-[5px] p-[8px] flex-row mt-[15px] ml-[40px]">
                    <View className="self-center">
                      <MaterialCommunityIcons
                        name="list-status"
                        size={16}
                        color="#e3a37d"
                      />
                    </View>
                    <View className="w-[100%] pl-[10px] ">
                      <Text className="font-normal text-headerText text-[14px]">
                        User Permissions
                      </Text>
                    </View>
                    <View className="absolute self-center right-0">
                      <Entypo
                        name="chevron-small-right"
                        size={24}
                        color="#ab6a43"
                      />
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
