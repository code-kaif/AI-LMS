import { View, Text, Image } from "react-native";
import React from "react";
import Button from "../shared/Button";
import { useRouter } from "expo-router";

const NoCourse: React.FC = () => {
  const router = useRouter();

  return (
    <View className="mt-10 flex items-center bg-white">
      <Image
        source={require("../../assets/images/book.png")}
        className="h-52 w-52"
      />
      <Text className="font-bold text-[25px] text-center mt-4">
        You Don't Have Any Course
      </Text>

      <Button
        text="Create New Course"
        onPress={() => router.push("/addcourse")}
      />
      <Button text="Explore Existing Courses" type="outline" />
    </View>
  );
};

export default NoCourse;
