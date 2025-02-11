import { View, Text, Image, ScrollView } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import Button from "@/components/shared/Button";

const Summary = () => {
  const { quizResultParam } = useLocalSearchParams();
  const quizResult = JSON.parse(quizResultParam);

  const [correctAns, setCorrectAns] = useState(0);
  const [totalQuestion, setTotalQuestion] = useState(0);

  useEffect(() => {
    if (quizResult) {
      const correctAnswers = Object.values(quizResult).filter(
        (q: any) => q.isCorrect
      ).length;
      setCorrectAns(correctAnswers);
      setTotalQuestion(Object.keys(quizResult).length);
    }
  }, [quizResult]);

  const GetPercMark = useMemo(() => {
    return totalQuestion ? ((correctAns / totalQuestion) * 100).toFixed() : 0;
  }, [correctAns, totalQuestion]);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      className="flex-1 bg-gray-100"
    >
      <Image
        source={require("../../assets/images/wave.png")}
        className="w-full h-[300px]"
      />
      <View className="absolute top-10 w-full p-5">
        <Text className="text-center font-bold text-3xl text-white">
          Quiz Summary
        </Text>
      </View>

      <View className="bg-white p-5 rounded-xl mx-5 mt-[-80px] shadow-md">
        <Image
          source={require("../../assets/images/trophy.png")}
          className="w-24 h-24 mx-auto -mt-14"
        />
        <Text className="text-xl font-semibold text-center">
          {GetPercMark > 60 ? "Congratulations 🎉" : "You can do better! 💪"}
        </Text>
        <Text className="text-gray-500 text-[13px] text-center mt-1">
          You scored {GetPercMark}% correct answers
        </Text>

        {/* Stats */}
        <View className="flex flex-row justify-between mt-5 px-5">
          <View className="p-3 bg-gray-200 rounded-lg">
            <Text className="text-[15px] font-semibold">Q {totalQuestion}</Text>
          </View>
          <View className="p-3 bg-green-200 rounded-lg">
            <Text className="text-[15px] font-semibold">✅ {correctAns}</Text>
          </View>
          <View className="p-3 bg-red-200 rounded-lg">
            <Text className="text-[15px] font-semibold">
              ❌ {totalQuestion - correctAns}
            </Text>
          </View>
        </View>

        <Button
          text="Back to Home"
          onPress={() => router.replace("/(tabs)/home")}
          className="mt-5"
        />
      </View>

      {/* Summary List */}
      <View className="my-8 mx-5">
        <Text className="font-semibold text-2xl">Summary:</Text>
        {Object.entries(quizResult).map(([key, quizItem], index) => (
          <View
            key={index}
            className={`p-4 mt-3 rounded-md ${
              quizItem?.isCorrect
                ? "bg-lightGreen border border-lightGreen"
                : "bg-light_Red border border-light_Red"
            }`}
          >
            <Text className="text-[15px] font-semibold">
              {quizItem.question}
            </Text>
            <Text className="text-sm text-gray-700">
              Correct Answer: {quizItem?.correctAns}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Summary;
