import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { imageAssests } from "@/constant/Option";
import * as Progress from "react-native-progress";
import Color from "@/constant/Color";

const CourseProgress = ({ courseList }) => {
  console.log(courseList);
  return (
    <View className="mt-5">
      <Text className="text-xl font-bold text-gray-800 mb-3">
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
                progress={0.3}
                width={230}
                color={Color.Primary}
                borderRadius={5}
              />
              <Text className="text-gray-700 text-sm mt-2">
                3 out of {item?.chapters?.length} chapters completed
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default CourseProgress;
