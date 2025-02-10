import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { imageAssests } from "@/constant/Option";
import * as Progress from "react-native-progress";
import Color from "@/constant/Color";

const CourseProgress = ({ courseList }) => {
  const GetCompletedChapter = (course: any) => {
    const completedChapter = course?.completedChapter?.length;
    const perc = completedChapter / course?.chapters?.length;
    return perc;
  };

  return (
    <View className="mt-5">
      <Text className="text-xl text-white font-bold text-gray-800 mb-3">
        Course Progress
      </Text>

      <FlatList
        data={courseList}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View
            key={index}
            className="m-1 p-4 bg-white w-72 rounded-lg shadow-md"
          >
            {/* Course Header */}
            <View className="flex-row items-center gap-3">
              <Image
                source={imageAssests[item?.banner_image]}
                className="w-16 h-16 rounded-md"
              />
              <View className="flex-1">
                <Text
                  numberOfLines={2}
                  className="text-lg font-semibold text-gray-900"
                >
                  {item?.courseTitle}
                </Text>
                <Text className="text-gray-600 text-sm">
                  {item?.chapters?.length} Chapters
                </Text>
              </View>
            </View>

            {/* Progress Bar */}
            <View className="mt-4">
              <Progress.Bar
                progress={GetCompletedChapter(item)}
                width={230}
                color={Color.Primary}
                borderRadius={5}
              />
              <Text className="text-gray-700 text-sm mt-2">
                {item?.completedChapter?.length ?? 0} Out of{" "}
                {item?.chapters?.length} Chapters Completed
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default CourseProgress;
