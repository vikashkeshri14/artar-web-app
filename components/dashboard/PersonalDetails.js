import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import {
  MaterialIcons,
  FontAwesome,
  FontAwesome6,
  AntDesign,
  Entypo,
  Octicons,
} from "@expo/vector-icons";

export default function PersonalDetails(props) {
  const [userDetails, setUserDetails] = useState(null);
  const [empDetails, setEmpDetails] = useState([]);
  useEffect(() => {
    setUserDetails((userDetails) => props.userDetails);
    setEmpDetails((empDetails) => props.empDetails);
  }, [props]);
  return (
    <View className="flex p-[5px] pb-[20px] bg-[#ffffff] rounded-[6px]">
      <View className="flex flex-row mt-[15px] justify-evenly">
        <View className="flex flex-row w-[50%]">
          <View className="flex mt-[5px]">
            <MaterialIcons
              name="mark-email-read"
              size={24}
              color="#ab6a43"
            />
          </View>
          <View className="flex ml-[5px]">
            <View className="flex">
              <Text className="text-buttonColor text-[12px] font-bold">
                Email Id
              </Text>
            </View>
            <View className="flex">
              <Text className="text-[11px] font-bold text-headerText">
                {empDetails.length > 0 && empDetails[0].Email}
              </Text>
            </View>
          </View>
        </View>
        <View className="flex flex-row w-[50%]">
          <View className="flex mt-[5px]">
            <FontAwesome
              name="calendar-check-o"
              size={24}
              color="#ab6a43"
            />
          </View>
          <View className="flex ml-[5px]">
            <View className="flex">
              <Text className="text-buttonColor text-[12px] font-bold">
                Date of Joining
              </Text>
            </View>
            <View className="flex">
              <Text className="text-[11px] font-bold text-headerText">
                {empDetails.length > 0 && empDetails[0].employment_date}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View className="flex mt-[25px] flex-row justify-evenly">
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
              <Text className="text-buttonColor text-[12px] font-bold">
                Code
              </Text>
            </View>
            <View className="flex">
              <Text className="text-[11px] font-bold text-headerText">
                {userDetails != null && userDetails.employee_code}
              </Text>
            </View>
          </View>
        </View>
        <View className="flex flex-row w-[50%]">
          <View className="flex mt-[5px]">
            <AntDesign
              name="mobile1"
              size={24}
              color="#ab6a43"
            />
          </View>
          <View className="flex ml-[5px]">
            <View className="flex">
              <Text className="text-buttonColor text-[12px] font-bold">
                Phone
              </Text>
            </View>
            <View className="flex">
              <Text className="text-[11px] font-bold text-headerText">
                {userDetails != null && userDetails.mobile}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View className="flex mt-[25px] flex-row justify-evenly">
        <View className="flex flex-row w-[50%]">
          <View className="flex mt-[5px]">
            <FontAwesome6
              name="id-badge"
              size={24}
              color="#ab6a43"
            />
          </View>
          <View className="flex ml-[5px]">
            <View className="flex">
              <Text className="text-buttonColor text-[12px] font-bold">
                National Code
              </Text>
            </View>
            <View className="flex">
              <Text className="text-[11px] font-bold text-headerText">
                {empDetails.length > 0 && empDetails[0].National_Code}
              </Text>
            </View>
          </View>
        </View>
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
              <Text className="text-buttonColor text-[12px] font-bold">
                Department
              </Text>
            </View>
            <View className="flex">
              <Text className="text-[11px] font-bold text-headerText">
                {empDetails.length > 0 && empDetails[0].Department_1_English}
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
              <Text className="text-buttonColor text-[12px] font-bold">
                Branch Code
              </Text>
            </View>
            <View className="flex">
              <Text className="text-[11px] font-bold text-headerText">
                {userDetails != null && userDetails.branch_code}
              </Text>
            </View>
          </View>
        </View>
        <View className="flex flex-row w-[50%]">
          <View className="flex mt-[5px]">
            <FontAwesome6
              name="building-user"
              size={24}
              color="#ab6a43"
            />
          </View>
          <View className="flex ml-[5px]">
            <View className="flex">
              <Text className="text-buttonColor text-[12px] font-bold">
                Position
              </Text>
            </View>
            <View className="flex">
              <Text className="text-[11px] font-bold text-headerText">
                {empDetails.length > 0 && empDetails[0].Position_2_English}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className="flex justify-center mt-[25px] self-center">
        <Image
          className="w-[150px]  h-[150px]"
          source={{
            uri: "https://web.artar.com.sa/core/storage/app/qrcode_images/Employee_14396_qr_digital_card.png",
          }}
        />
      </View>
    </View>
  );
}
