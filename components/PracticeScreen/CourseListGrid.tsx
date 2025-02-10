import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Color from "@/constant/Color";
import { router } from "expo-router";

const CourseListGrid = ({ courseList, option }) => {
  const onPress = (item: any) => {
    if (option.name == "Quiz") {
      router.push({
        pathname: "/quiz",
        params: {
          courseParams: JSON.stringify(item),
        },
      });
    }
  };
  return (
    <View>
      <FlatList
        data={courseList}
        numColumns={2}
        className="p-5"
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onPress(item)}
            key={index}
            className="flex-1 flex items-center justify-center flex-col p-4 m-2 bg-white rounded-md"
          >
            <AntDesign
              name="checkcircle"
              size={24}
              color={Color.Gray}
              className="absolute top-2 right-4"
            />
            <Image source={option?.icon} className="w-20 h-20 object-contain" />
            <Text className="text-center mt-2">{item?.courseTitle}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CourseListGrid;
