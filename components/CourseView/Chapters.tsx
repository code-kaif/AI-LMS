import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import Color from "@/constant/Color";
import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

const Chapters = ({ course }: any) => {
  const isChapterCompleted = (index: any) => {
    const isCompleted = course?.completedChapter?.find(
      (item: any) => item == index
    );
    return isCompleted ? true : false;
  };

  return (
    <View className="p-5">
      <Text className="font-semibold text-xl mb-3">Chapters</Text>

      <FlatList
        data={course?.chapters}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/chapterView",
                params: {
                  chapterParams: JSON.stringify(item),
                  docId: course?.docId,
                  chapterIndex: index,
                },
              });
            }}
            key={index}
            className="flex flex-row justify-between items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200 mb-3"
          >
            {/* Chapter Number & Title */}
            <View className="flex-1 flex-row items-center gap-3">
              <Text className="text-lg font-bold text-gray-700">
                {index + 1}.
              </Text>
              <Text
                className="text-lg text-gray-800 flex-1"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item?.chapterName}
              </Text>
            </View>

            {/* Play Icon */}
            {isChapterCompleted(index) ? (
              <AntDesign name="checkcircleo" size={24} color={Color.Green} />
            ) : (
              <Entypo name="controller-play" size={24} color={Color.Primary} />
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Chapters;
