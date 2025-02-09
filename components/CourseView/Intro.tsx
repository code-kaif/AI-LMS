import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { imageAssests } from "@/constant/Option";
import Feather from "@expo/vector-icons/Feather";
import Button from "../shared/Button";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";

const Intro = ({ course }: any) => {
  return (
    <View className="relative bg-white">
      {/* Course Banner */}
      <Image
        source={imageAssests[course?.banner_image]}
        className="w-full h-64 rounded-b-2xl"
      />

      {/* Course Info */}
      <View className="px-5 py-6 bg-white rounded-t-3xl shadow-lg -mt-6">
        <Text className="font-bold text-xl">{course?.courseTitle}</Text>

        {/* Chapters Count */}
        <View className="flex flex-row items-center mt-2">
          <Feather name="book-open" size={18} color="#6b7280" />
          <Text className="ml-1 text-gray-500 text-[14px]">
            {course?.chapters?.length} Chapters
          </Text>
        </View>

        {/* Description */}
        <Text className="font-semibold text-[16px] mt-3">Description:</Text>
        <Text className="text-[14px] text-gray-600 leading-relaxed">
          {course?.description}
        </Text>

        {/* Start Button */}
        <View className="mt-5">
          <Button text="Start Now" onPress={() => console.log("Detail Page")} />
        </View>
      </View>

      {/* Back Button */}
      <Pressable
        className="absolute top-4 left-4 bg-white p-2.5 rounded-full shadow-md"
        onPress={() => router.back()}
      >
        <AntDesign name="arrowleft" size={26} color="black" />
      </Pressable>
    </View>
  );
};

export default Intro;
