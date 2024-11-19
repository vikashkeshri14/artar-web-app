import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, MaterialIcons, Ionicons } from "@expo/vector-icons";
import GlobalStyle from "../../hooks/GlobalStyle";
import * as ApiService from "../../config/config";
import apiList from "../../config/apiList.json";
import Dashboard from "./Dashboard";
import Support from "./Support";
import Settings from "./Settings";
import Directory from "./Directory";

const Tab = createBottomTabNavigator();
export default function BottomNavigation({ navigation, route }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        showLabel: false,
        tabBarActiveTintColor: "#e91e63",
        tabBarStyle: {
          backgroundColor: "#fff",
          shadowOffset: {
            width: 0,
            height: 90,
          },
          shadowOpacity: 0.88,
          shadowRadius: 30.0,
          elevation: 8,
          borderTopWidth: 0,
          position: "absolute",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 80,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Dashboard}
        listeners={({ navigation }) => ({
          blur: () => navigation.setParams({ screen: undefined }),
        })}
        options={({ navigation }) => {
          return {
            tabBarLabel: () => {},
            tabBarIcon: ({ focused }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("BottomNavigation", {
                    screen: "Home",
                  })
                }
              >
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    top: 5,
                  }}
                >
                  {focused ? (
                    <View className="flex flex-col self-center justify-center">
                      <View className="self-center">
                        <Entypo
                          name="home"
                          size={24}
                          color="#ab6a43"
                        />
                      </View>
                      <View className="self-center w-[70px]">
                        <Text className="text-[11px] font-bold text-center text-textDark">
                          Home
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View className="flex flex-col self-center justify-center">
                      <View className="self-center">
                        <Entypo
                          name="home"
                          size={24}
                          color="#e3a37d"
                        />
                      </View>
                      <View className="self-center w-[70px]">
                        <Text className="text-[11px] text-center text-textLightBlack">
                          Home
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ),
            unmountOnBlur: true,
          };
        }}
      />
      <Tab.Screen
        name="Support"
        component={Support}
        listeners={({ navigation }) => ({
          blur: () => navigation.setParams({ screen: undefined }),
        })}
        options={({ navigation }) => {
          return {
            tabBarLabel: () => {},
            tabBarIcon: ({ focused }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("BottomNavigation", {
                    screen: "Support",
                  })
                }
              >
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    top: 5,
                  }}
                >
                  {focused ? (
                    <View className="flex flex-col self-center justify-center">
                      <View className="self-center">
                        <MaterialIcons
                          name="support-agent"
                          size={24}
                          color="#ab6a43"
                        />
                      </View>
                      <View className="self-center w-[70px]">
                        <Text className="text-[11px] font-bold text-center text-textDark">
                          Support
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View className="flex flex-col self-center justify-center">
                      <View className="self-center">
                        <MaterialIcons
                          name="support-agent"
                          size={24}
                          color="#e3a37d"
                        />
                      </View>
                      <View className="self-center w-[70px]">
                        <Text className="text-[11px]  text-center text-textLightBlack">
                          Support
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ),
            unmountOnBlur: true,
          };
        }}
      />
      <Tab.Screen
        name="Directory"
        component={Directory}
        listeners={({ navigation }) => ({
          blur: () => navigation.setParams({ screen: undefined }),
        })}
        options={({ navigation }) => {
          return {
            tabBarLabel: () => {},
            tabBarIcon: ({ focused }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("BottomNavigation", {
                    screen: "Directory",
                  })
                }
              >
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    top: 5,
                  }}
                >
                  {focused ? (
                    <View className="flex flex-col self-center justify-center">
                      <View className="self-center">
                        <Entypo
                          name="old-phone"
                          size={24}
                          color="#ab6a43"
                        />
                      </View>
                      <View className="self-center w-[70px]">
                        <Text className="text-[11px] font-bold text-center text-textDark">
                          Directory
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View className="flex flex-col self-center justify-center">
                      <View className="self-center">
                        <Entypo
                          name="old-phone"
                          size={24}
                          color="#e3a37d"
                        />
                      </View>
                      <View className="self-center w-[70px]">
                        <Text className="text-[11px] text-center text-textLightBlack">
                          Directory
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ),
            unmountOnBlur: true,
          };
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        listeners={({ navigation }) => ({
          blur: () => navigation.setParams({ screen: undefined }),
        })}
        options={({ navigation }) => {
          return {
            tabBarLabel: () => {},
            tabBarIcon: ({ focused }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("BottomNavigation", {
                    screen: "Settings",
                  })
                }
              >
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    top: 5,
                  }}
                >
                  {focused ? (
                    <View className="flex flex-col self-center justify-center">
                      <View className="self-center">
                        <Ionicons
                          name="settings"
                          size={24}
                          color="#ab6a43"
                        />
                      </View>
                      <View className="self-center w-[70px]">
                        <Text className="text-[11px] font-bold text-center text-textDark">
                          Settings
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View className="flex flex-col self-center justify-center">
                      <View className="self-center">
                        <Ionicons
                          name="settings"
                          size={24}
                          color="#e3a37d"
                        />
                      </View>
                      <View className="self-center w-[70px]">
                        <Text
                          style={GlobalStyle.sstmedium}
                          className="text-[11px] text-center text-textLightBlack"
                        >
                          Settings
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ),
            unmountOnBlur: true,
          };
        }}
      />
    </Tab.Navigator>
  );
}
