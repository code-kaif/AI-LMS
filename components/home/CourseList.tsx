import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { imageAssests } from "../../constant/Option.jsx";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";

const CourseList: React.FC = ({ courseList }: any) => {
  const router = useRouter();
  return (
    <View className="mt-4">
      <Text className="text-2xl font-bold text-gray-800 mb-3">Courses</Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={courseList}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/courseView/" + item?.docId,
                params: {
                  courseParams: JSON.stringify(item),
                },
              })
            }
            key={index}
            className="w-60 bg-white rounded-xl shadow-lg mr-4 overflow-hidden"
          >
            <View className="relative">
              <Image
                source={imageAssests[item.banner_image]}
                className="w-full h-40"
              />
              <View className="absolute inset-0 bg-black/20 rounded-t-xl" />
            </View>

            <View className="p-3">
              <Text
                numberOfLines={1}
                className="text-lg font-bold text-gray-900"
              >
                {item?.courseTitle}
              </Text>

              <View className="flex flex-row items-center mt-2">
                <Feather name="book-open" size={18} color="#6b7280" />
                <Text className="ml-1 text-gray-500 text-sm">
                  {item?.chapters?.length} Chapters
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CourseList;
