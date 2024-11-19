import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import GlobalStyle from "../../hooks/GlobalStyle";
import Loading from "../../components/loading/Loading";
import BackButton from "../../components/button/BackButton";
import AddArtarSupport from "../../components/support/AddArtarSupport";
import AddEmpireSupport from "../../components/support/AddEmpireSupport";

export default function AddTicket({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [artarTicketTab, setArtarTicketTab] = useState(true);
  const [empireTicketTab, setEmpireTicketTab] = useState(false);

  return (
    <View className="flex-1 w-full bg-white  justify-center ">
      <SafeAreaView
        style={GlobalStyle.droidSafeArea}
        className="ml-[15px] mr-[15px]"
      >
        <View className="flex mb-[40px]">
          <View className="absolute pt-[5px] w-full">
            <Text className="text-center text-headerText text-[20px] font-bold">
              Add Ticket
            </Text>
          </View>
          <View className="absolute left-0">
            <BackButton nav={navigation} />
          </View>
        </View>
        <View className="flex flex-row mt-[10px] bg-[#ffffff] rounded-[6px]">
          <View className="flex w-[50%]">
            <TouchableOpacity
              onPress={() => {
                setArtarTicketTab((artarTicketTab) => true);
                setEmpireTicketTab((empireTicketTab) => false);
              }}
              className={
                artarTicketTab
                  ? "w-[100%] pb-[10px] pt-[10px] bg-buttonColor rounded-tl-[6px] rounded-bl-[6px]"
                  : "w-[100%] pb-[10px] pt-[10px] bg-[#ffffff] rounded-tl-[6px] rounded-bl-[6px]"
              }
            >
              <Text
                className={
                  artarTicketTab
                    ? "text-center text-[12px] font-bold text-[#ffffff]"
                    : "text-center text-[12px] font-bold text-buttonColor"
                }
              >
                Arter Ticket
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex w-[50%]">
            <TouchableOpacity
              onPress={() => {
                setArtarTicketTab((artarTicketTab) => false);
                setEmpireTicketTab((empireTicketTab) => true);
              }}
              className={
                empireTicketTab
                  ? "w-[100%] pb-[10px] pt-[10px] bg-buttonColor rounded-tr-[6px] rounded-br-[6px]"
                  : "w-[100%] pb-[10px] pt-[10px] bg-[#ffffff] rounded-tr-[6px] rounded-br-[6px]"
              }
            >
              <Text
                className={
                  empireTicketTab
                    ? "text-center text-[12px] font-bold text-[#ffffff]"
                    : "text-center text-[12px] font-bold text-buttonColor"
                }
              >
                Empire Ticket
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-1 mt-[10px]">
          {artarTicketTab && <AddArtarSupport nav={navigation} />}
          {empireTicketTab && <AddEmpireSupport nav={navigation} />}
        </View>
      </SafeAreaView>
    </View>
  );
}
