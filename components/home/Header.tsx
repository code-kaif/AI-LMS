import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Feather from "@expo/vector-icons/Feather";

const Header: React.FC = () => {
  const { userDetail } = useContext(UserContext);

  return (
    <View className="flex-row justify-between items-center">
      <View>
        <Text className="font-bold text-[25px] text-white">
          Hello {userDetail?.name}
        </Text>
        <Text className="text-lg text-white">Let's Get Started</Text>
      </View>
      <TouchableOpacity>
        <Feather name="settings" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
