import { View, Text, Image, FlatList } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import Intro from "@/components/CourseView/Intro";
import Chapters from "@/components/CourseView/Chapters";

const CourseView = () => {
  const { courseParams } = useLocalSearchParams();
  const course = JSON.parse(courseParams);

  return (
    <FlatList
      data={[]}
      ListHeaderComponent={
        <View className="flex-1 bg-white">
          <Intro course={course} />
          <Chapters course={course} />
        </View>
      }
    />
  );
};

export default CourseView;
