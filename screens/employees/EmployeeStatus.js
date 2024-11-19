import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Platform,
  TextInput,
  ScrollView,
  Animated,
  StyleSheet,
} from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome6,
  MaterialIcons,
  FontAwesome,
  Entypo,
  Fontisto,
  Octicons,
  AntDesign,
  FontAwesome5,
} from "@expo/vector-icons";
import React, { useEffect, useState, useRef } from "react";
import GlobalStyle from "../../hooks/GlobalStyle";
import Loading from "../../components/loading/Loading";
import * as ApiService from "../../config/config";
import apiList from "../../config/apiList.json";
import BackButton from "../../components/button/BackButton";
import * as SecureStore from "expo-secure-store";
import { Dropdown } from "react-native-element-dropdown";

export default function EmployeeStatus({ navigation }) {
  const [listData, setListData] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [username, setUsername] = useState("");

  const [loading, setLoading] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);
  const [filterOption, setFilterOption] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [iqama, setIqama] = useState("");
  const [arName, setArName] = useState("");
  const [enName, setEnName] = useState("");
  const [placeOfWork, setPlaceOfWork] = useState("");
  const [directManager, setDirectManager] = useState("");
  const [branchSelected, setBranchSelected] = useState("");
  const [statusSelected, setStatusSelected] = useState("");
  const [sectorSelected, setSectorSelected] = useState("");
  const [departmentSelected, setDepartmentSelected] = useState("");
  const [value, setValue] = useState(null);
  const [status, setStatus] = useState([]);
  const [sector, setSector] = useState([]);
  const [branch, setBranch] = useState([]);
  const [department, setDepartment] = useState([]);
  useEffect(() => {
    if (listData == null) {
      getUser();
    }
    getStatusDropdown();
    getBranchDropdown();
    getDepartmentDropdown();
    getSectorDropdown();
  }, []);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  const getUser = async () => {
    let LoginUser = await SecureStore.getItemAsync("LoginUser");
    let userDetails = JSON.parse(LoginUser);
    let user = userDetails.Email.split("@");
    setUsername((username) => user[0]);
    getAllEmployeeStatus(userDetails.employee_code, user[0]);
    // console.log(username);
  };

  //get status dropdown
  const getStatusDropdown = async () => {
    let params = { url: apiList.getStatusDropdown };
    let response = await ApiService.getData(params);
    // console.log(response);
    if (response.results.length > 0) {
      setStatus(response.results);
    }
  };
  //get branch dropdown
  const getBranchDropdown = async () => {
    let params = { url: apiList.getBranch };
    let response = await ApiService.getData(params);
    // console.log(response);
    if (response.results.length > 0) {
      setBranch(response.results);
    }
  };
  //get sector dropdown
  const getSectorDropdown = async () => {
    let params = { url: apiList.getSector };
    let response = await ApiService.getData(params);
    // console.log(response);
    if (response.results.length > 0) {
      setSector(response.results);
    }
  };
  //get department dropdown
  const getDepartmentDropdown = async () => {
    let params = { url: apiList.getDepartment };
    let response = await ApiService.getData(params);
    // console.log(response);
    if (response.results.length > 0) {
      setDepartment(response.results);
    }
  };

  const getAllEmployeeStatus = async (employee_code, uname) => {
    setLoading((loading) => true);
    const obj = JSON.stringify({
      email: uname,
    });
    let params = { url: apiList.getAllEmployeeStatus, body: obj };
    let response = await ApiService.postData(params);
    //console.log(response);
    setLoading((loading) => false);
    if (response.success) {
      if (response.results.length > 0) {
        setListData(response.results);
        setFilterData((filterData) => response.results);
      }
    } else {
      setAccessDenied(true);
    }
  };
  const ItemView = ({ item }) => {
    //console.log(item);
    return (
      // Single Comes here which will be repeatative for the FlatListItems
      <TouchableOpacity
        className="bg-[#fff]  rounded-[10px] border-[1px] border-buttonColor/40"
        onPress={() => {}}
      >
        <View className="bg-white flex pt-[10px] pb-[10px] ml-[10px] mr-[10px] justify-center">
          <View className="flex flex-row mt-[15px] justify-evenly">
            <View className="flex flex-row w-[50%]">
              <View className="flex mt-[5px]">
                <AntDesign
                  name="idcard"
                  size={24}
                  color="#ab6a43"
                />
              </View>
              <View className="flex ml-[5px]">
                <View className="flex">
                  <Text className="text-buttonColor font-semibold text-[12px] ">
                    Employee Id
                  </Text>
                </View>
                <View className="flex">
                  <Text
                    style={GlobalStyle.sstbold}
                    className="text-[10px] leading-[18px] text-headerText"
                  >
                    {item.employee_code}
                  </Text>
                </View>
              </View>
            </View>
            <View className="flex flex-row w-[50%]">
              <View className="flex mt-[5px]">
                <MaterialCommunityIcons
                  name="card-account-details-outline"
                  size={24}
                  color="#ab6a43"
                />
              </View>
              <View className="flex ml-[5px]">
                <View className="flex">
                  <Text className="text-buttonColor font-semibold text-[12px] ">
                    Iqama
                  </Text>
                </View>
                <View className="flex">
                  <Text
                    style={GlobalStyle.sstbold}
                    className="text-[10px] leading-[18px]  text-headerText"
                  >
                    {item.iqama}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View className="flex mt-[25px] flex-row justify-evenly">
            <View className="flex flex-row w-[50%]">
              <View className="flex mt-[5px]">
                <FontAwesome5
                  name="user-tie"
                  size={24}
                  color="#ab6a43"
                />
              </View>
              <View className="flex ml-[5px]">
                <View className="flex">
                  <Text className="text-buttonColor font-semibold text-[12px] ">
                    Arabic Name
                  </Text>
                </View>
                <View className="flex">
                  <Text
                    style={GlobalStyle.sstbold}
                    className="text-[10px] leading-[18px]  text-headerText"
                  >
                    {item.employee_name_a}
                  </Text>
                </View>
              </View>
            </View>
            <View className="flex flex-row w-[50%]">
              <View className="flex mt-[5px]">
                <FontAwesome5
                  name="user-tie"
                  size={24}
                  color="#ab6a43"
                />
              </View>
              <View className="flex ml-[5px]">
                <View className="flex">
                  <Text className="text-buttonColor font-semibold text-[12px] ">
                    English Name
                  </Text>
                </View>
                <View className="flex">
                  <Text
                    style={GlobalStyle.sstbold}
                    className="text-[10px] leading-[18px]  text-headerText"
                  >
                    {item.employee_name_eng}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View className="flex mt-[25px] flex-row justify-evenly">
            <View className="flex flex-row w-[50%]">
              <View className="flex mt-[5px]">
                <MaterialCommunityIcons
                  name="list-status"
                  size={24}
                  color="#ab6a43"
                />
              </View>
              <View className="flex ml-[5px]">
                <View className="flex">
                  <Text className="text-buttonColor text-[12px] font-semibold ">
                    Status
                  </Text>
                </View>
                <View className="flex">
                  <Text
                    style={GlobalStyle.sstbold}
                    className="text-[10px] leading-[18px]  text-headerText"
                  >
                    {item.Status_A}
                  </Text>
                </View>
              </View>
            </View>
            <View className="flex flex-row w-[50%]">
              <View className="flex mt-[5px]">
                <MaterialIcons
                  name="manage-accounts"
                  size={24}
                  color="#ab6a43"
                />
              </View>
              <View className="flex ml-[5px]">
                <View className="flex">
                  <Text className="text-buttonColor font-semibold text-[12px] ">
                    Direct Manager
                  </Text>
                </View>
                <View className="flex">
                  <Text
                    style={GlobalStyle.sstbold}
                    className="text-[10px] leading-[18px]  text-headerText"
                  >
                    {item.Manager_AR}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View className="flex mt-[25px] flex-row justify-evenly">
            <View className="flex flex-row w-[50%]">
              <View className="flex mt-[5px]">
                <Octicons
                  name="git-branch"
                  size={24}
                  color="#ab6a43"
                />
              </View>
              <View className="flex ml-[5px]">
                <View className="flex">
                  <Text className="text-buttonColor font-semibold text-[12px] ">
                    Branch
                  </Text>
                </View>
                <View className="flex">
                  <Text
                    style={GlobalStyle.sstbold}
                    className="text-[10px] leading-[18px]  text-headerText"
                  >
                    {item.branch_code}
                  </Text>
                </View>
              </View>
            </View>
            <View className="flex flex-row w-[50%]">
              <View className="flex mt-[5px]">
                <MaterialIcons
                  name="admin-panel-settings"
                  size={24}
                  color="#ab6a43"
                />
              </View>
              <View className="flex ml-[5px]">
                <View className="flex">
                  <Text className="text-buttonColor font-semibold text-[12px] ">
                    Sector
                  </Text>
                </View>
                <View className="flex">
                  <Text
                    style={GlobalStyle.sstbold}
                    className="text-[10px]  text-headerText"
                  >
                    {item.sector}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View className="flex mt-[25px] flex-row justify-evenly">
            <View className="flex flex-row w-[50%]">
              <View className="flex mt-[5px]">
                <Entypo
                  name="flow-tree"
                  size={24}
                  color="#ab6a43"
                />
              </View>
              <View className="flex ml-[5px]">
                <View className="flex">
                  <Text
                    style={GlobalStyle.sstbold}
                    className="text-buttonColor font-semibold text-[12px] "
                  >
                    Department
                  </Text>
                </View>
                <View className="flex">
                  <Text
                    style={GlobalStyle.sstbold}
                    className="text-[10px] leading-[18px]  text-headerText"
                  >
                    {item.department}
                  </Text>
                </View>
              </View>
            </View>
            <View className="flex flex-row w-[50%]">
              <View className="flex mt-[5px]">
                <MaterialCommunityIcons
                  name="office-building-marker"
                  size={24}
                  color="#ab6a43"
                />
              </View>
              <View className="flex ml-[5px]">
                <View className="flex">
                  <Text className="text-buttonColor font-semibold text-[12px] ">
                    Place of Work
                  </Text>
                </View>
                <View className="flex">
                  <Text
                    style={GlobalStyle.sstbold}
                    className="text-[10px] leading-[18px] text-headerText"
                  >
                    {item.BusinessLine}
                  </Text>
                </View>
              </View>
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

  const searchFilter = async () => {
    setLoading((loading) => true);
    setFilterOption((filterOption) => !filterOption);

    const obj = JSON.stringify({
      email: username,
      employeeId: employeeId,
      iqama: iqama,
      arName: arName,
      enName: enName,
      placeOfWork: placeOfWork,
      directManager: directManager,
      branch: branchSelected,
      sector: sectorSelected,
      department: departmentSelected,
      status: statusSelected,
    });
    //console.log(obj);

    let params = { url: apiList.getAllEmployeeStatusFilter, body: obj };
    let response = await ApiService.postData(params);
    //console.log(response);
    setLoading((loading) => false);
    // setFilterOption((filterOption) => !filterOption);
    if (response.success) {
      if (response.results.length > 0) {
        setListData(response.results);
        setFilterData((filterData) => response.results);
      }
    } else {
      setAccessDenied(true);
    }
  };

  return (
    <>
      <ImageBackground
        source={require("../../assets/background/gradient.jpg")}
        className="flex-1 w-full bg-cover justify-center "
      >
        {filterOption && (
          <Animated.View
            style={[
              {
                opacity: fadeAnim,
              },
            ]}
            className="absolute top-[80px] rounded-b-[25px] z-10 w-full  bg-[#daa788]"
          >
            <View className="bg-white flex pt-[10px] pb-[10px] ml-[10px] mr-[10px] justify-center">
              <View className="flex flex-row mt-[15px] justify-evenly">
                <View className="flex flex-row w-[50%]">
                  <View className="flex w-full ml-[5px] ">
                    <View className="flex ml-[5px]">
                      <Text className="text-[#fff] font-semibold text-[12px] ">
                        Employee Id
                      </Text>
                    </View>
                    <View className="flex mr-[15px] mt-[5px]">
                      <View className="border-[1px] w-full  rounded-[10px] border-[#fff]/60">
                        <TextInput
                          placeholder="Employee Id"
                          placeholderTextColor="#fff"
                          onChangeText={(e) => setEmployeeId((employeeId) => e)}
                          value={employeeId}
                          // className="transition-all duration-200 ${searchButton ? opacity-100 : opacity-0}"
                          className="h-[35px] pl-[10px] w-[100%]  "
                        ></TextInput>
                      </View>
                    </View>
                  </View>
                </View>
                <View className="flex flex-row w-[50%]">
                  <View className="flex  w-full ml-[5px]">
                    <View className="flex">
                      <Text className="text-[#fff] font-semibold text-[12px] ">
                        Iqama
                      </Text>
                    </View>
                    <View className="flex mr-[15px] mt-[5px]">
                      <View className="border-[1px] w-full  rounded-[10px] border-[#fff]/60">
                        <TextInput
                          placeholder="Iqama.."
                          onChangeText={(e) => setIqama((iqama) => e)}
                          value={iqama}
                          placeholderTextColor="#fff"
                          // className="transition-all duration-200 ${searchButton ? opacity-100 : opacity-0}"
                          className="h-[35px] pl-[10px] text-[#fff] w-[100%]  "
                        ></TextInput>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View className="flex mt-[25px] flex-row justify-evenly">
                <View className="flex flex-row w-[50%]">
                  <View className="flex ml-[5px] w-full">
                    <View className="flex">
                      <Text className="text-[#fff] font-semibold text-[12px] ">
                        Arabic Name
                      </Text>
                    </View>
                    <View className="flex mr-[15px] mt-[5px]">
                      <View className="border-[1px] w-full  rounded-[10px] border-[#fff]/60">
                        <TextInput
                          placeholder="Arabic Name.."
                          placeholderTextColor="#fff"
                          onChangeText={(e) => setArName((arName) => e)}
                          value={arName}
                          // className="transition-all duration-200 ${searchButton ? opacity-100 : opacity-0}"
                          className="h-[35px] pl-[10px] text-[#fff] w-[100%]  "
                        ></TextInput>
                      </View>
                    </View>
                  </View>
                </View>
                <View className="flex flex-row w-[50%]">
                  <View className="flex ml-[5px] w-full">
                    <View className="flex">
                      <Text className="text-[#fff] font-semibold text-[12px] ">
                        English Name
                      </Text>
                    </View>
                    <View className="flex mr-[15px] mt-[5px]">
                      <View className="border-[1px] w-full  rounded-[10px] border-[#fff]/60">
                        <TextInput
                          placeholder="English Name.."
                          placeholderTextColor="#fff"
                          onChangeText={(e) => setEnName((enName) => e)}
                          value={enName}
                          // className="transition-all duration-200 ${searchButton ? opacity-100 : opacity-0}"
                          className="h-[35px] pl-[10px] text-[#fff] w-[100%]  "
                        ></TextInput>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View className="flex mt-[25px] flex-row justify-evenly">
                <View className="flex flex-row w-[50%]">
                  <View className="flex ml-[5px] w-full">
                    <View className="flex">
                      <Text className="text-[#fff] font-semibold text-[12px] ">
                        Place of Work
                      </Text>
                    </View>
                    <View className="flex mr-[15px] mt-[5px]">
                      <View className="border-[1px] w-full  rounded-[10px] border-[#fff]/60">
                        <TextInput
                          placeholder="Place of work.."
                          placeholderTextColor="#FFF"
                          onChangeText={(e) =>
                            setPlaceOfWork((placeOfWork) => e)
                          }
                          value={placeOfWork}
                          // className="transition-all duration-200 ${searchButton ? opacity-100 : opacity-0}"
                          className="h-[35px] pl-[10px] text-[#fff] w-[100%]  "
                        ></TextInput>
                      </View>
                    </View>
                  </View>
                </View>
                <View className="flex flex-row w-[50%]">
                  <View className="flex ml-[5px] w-full">
                    <View className="flex">
                      <Text className="text-[#fff] font-semibold text-[12px] ">
                        Direct Manager
                      </Text>
                    </View>
                    <View className="flex mr-[15px] mt-[5px]">
                      <View className="border-[1px] w-full  rounded-[10px] border-[#fff]/60">
                        <TextInput
                          placeholder="Direct Manager.."
                          placeholderTextColor="#fff"
                          onChangeText={(e) =>
                            setDirectManager((directManager) => e)
                          }
                          value={directManager}
                          // className="transition-all duration-200 ${searchButton ? opacity-100 : opacity-0}"
                          className="h-[35px] pl-[10px] text-[#fff] w-[100%]  "
                        ></TextInput>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View className="flex mt-[25px] flex-row justify-evenly">
                <View className="flex flex-row w-[50%]">
                  <View className="flex w-full ml-[5px]">
                    <View className="flex">
                      <Text className="text-[#fff] font-semibold text-[12px] ">
                        Branch
                      </Text>
                    </View>
                    <View className="flex border-[1px] h-[35px] mt-[5px] rounded-[10px] border-[#fff]/60 mr-[15px] ">
                      <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={branch}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select item"
                        searchPlaceholder="Search..."
                        value={branchSelected}
                        onChange={(item) => {
                          setBranchSelected(item.value);
                        }}
                      />
                    </View>
                  </View>
                </View>
                <View className="flex flex-row w-[50%]">
                  <View className="flex w-full ml-[5px]">
                    <View className="flex">
                      <Text className="text-[#fff] font-semibold text-[12px] ">
                        Sector
                      </Text>
                    </View>
                    <View className="flex border-[1px] h-[35px] mt-[5px] rounded-[10px] border-[#fff]/60 mr-[15px] ">
                      <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={sector}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select item"
                        searchPlaceholder="Search..."
                        value={sectorSelected}
                        onChange={(item) => {
                          setSectorSelected(item.value);
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View className="flex mt-[25px] flex-row justify-evenly">
                <View className="flex flex-row w-[50%]">
                  <View className="flex w-full ml-[5px]">
                    <View className="flex">
                      <Text className="text-[#fff] font-semibold text-[12px] ">
                        Department
                      </Text>
                    </View>
                    <View className="flex border-[1px] h-[35px] mt-[5px] rounded-[10px] border-[#fff]/60 mr-[15px] ">
                      <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={department}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select item"
                        searchPlaceholder="Search..."
                        value={departmentSelected}
                        onChange={(item) => {
                          setDepartmentSelected(item.value);
                        }}
                      />
                    </View>
                  </View>
                </View>
                <View className="flex flex-row w-[50%]">
                  <View className="flex ml-[5px] w-full">
                    <View className="flex">
                      <Text className="text-[#fff] text-[12px] font-semibold ">
                        Status
                      </Text>
                    </View>
                    <View className="flex border-[1px] h-[35px] mt-[5px] rounded-[10px] border-[#fff]/60 mr-[15px] ">
                      <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={status}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select item"
                        searchPlaceholder="Search..."
                        value={statusSelected}
                        onChange={(item) => {
                          setStatusSelected(item.value);
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>

              <View className="flex justify-center w-full mt-[20px] mb-[0px] ">
                <View className="flex mt-[10px] w-full self-center">
                  <TouchableOpacity
                    onPress={() => {
                      searchFilter();
                    }}
                    className="bg-[#28a745] flex rounded-[10px] w-full p-[8px] "
                  >
                    <Text className="text-[#fff] text-center  font-bold">
                      Apply
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Animated.View>
        )}

        <SafeAreaView
          style={GlobalStyle.droidSafeArea}
          className="ml-[15px] mr-[15px]"
        >
          {loading && <Loading />}
          <View className="flex mb-[40px]">
            <View className="absolute pt-[5px] w-full">
              <Text className="text-center text-headerText text-[20px] ">
                Employees Information
              </Text>
            </View>
            <View className="absolute left-0">
              <TouchableOpacity
                className="rounded-full p-[5px] bg-buttonColor/60"
                onPress={() => {
                  if (filterOption) {
                    fadeOut();
                    setFilterOption((filterOption) => !filterOption);
                  } else {
                    fadeIn();
                    setFilterOption((filterOption) => !filterOption);
                  }
                }}
              >
                <MaterialCommunityIcons
                  name="account-filter"
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
            </View>
            <View className="absolute right-0">
              <BackButton nav={navigation} />
            </View>
          </View>

          {accessDenied ? (
            <View className="flex flex-1 text-center justify-center self-center">
              <View className=" flex self-center">
                <Octicons
                  name="no-entry"
                  size={60}
                  color="#ab6a43"
                />
              </View>

              <Text className="text-center text-headerText text-[24px] ">
                Access Denied
              </Text>
            </View>
          ) : (
            <View
              className={
                Platform.OS === "android"
                  ? "flex  mt-[20px] "
                  : "flex  mt-[20px] "
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
          )}
        </SafeAreaView>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    margin: 6,
    color: "#000",
  },
  icon: {
    marginRight: 5,
    color: "#ffffff",
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#ffffff",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#ffffff",
  },
  iconStyle: {
    width: 20,
    height: 20,
    color: "#ffffff",
  },
  inputSearchStyle: {
    height: 35,
    fontSize: 16,
    color: "#000",
  },
});
