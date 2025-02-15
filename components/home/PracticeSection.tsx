import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { PracticeOption } from "@/constant/Option";
import { router } from "expo-router";

const PracticeSection = () => {
  return (
    <View className="mt-4">
      <Text className="text-2xl font-bold text-gray-800 mb-3">Practice</Text>
      <FlatList
        data={PracticeOption}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push("/practice/" + item.name)}
            className="flex-1 m-2 rounded-lg overflow-hidden shadow-md bg-white"
          >
            <View className="relative">
              <Image source={item.image} className="w-full h-28" />
              <View className="absolute p-1 flex items-center justify-center">
                <Text className="text-lg font-semibold text-white">
                  {item.name}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default PracticeSection;
