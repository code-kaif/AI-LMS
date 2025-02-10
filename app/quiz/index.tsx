import {
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Color from "@/constant/Color";
import * as Progress from "react-native-progress";
import Button from "@/components/shared/Button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

const Quiz = () => {
  const { courseParams } = useLocalSearchParams();
  const course = JSON.parse(courseParams);
  const quiz = course?.quiz;
  const [currPage, setCurrPage] = useState(0);
  const [selectedOption, setSelectedOption] = useState(0);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const GetProgress = (currPage: any) => {
    const pers = currPage / quiz?.length;
    return pers;
  };

  const OnOptionSelect = (selectedChoice: any) => {
    setResult((prev: any) => ({
      ...prev,
      [currPage]: {
        userChoice: selectedChoice,
        isCorrect: quiz[currPage]?.correctAns == selectedChoice,
        question: quiz[currPage]?.question,
        correctAns: quiz[currPage]?.correctAns,
      },
    }));
    console.log(result);
  };

  const onQuizFinish = async () => {
    try {
      setLoading(true);
      await updateDoc(doc(db, "courses", course?.docId), {
        quizResult: result,
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <View>
      <Image
        source={require("../../assets/images/wave.png")}
        className="w-full h-[800px]"
      />
      <View className="absolute p-6 w-full">
        <View className="flex justify-between flex-row items-center">
          <Pressable onPress={() => router.back()}>
            <AntDesign name="arrowleft" size={26} color="white" />
          </Pressable>
          <Text className="font-semibold text-2xl text-white">
            {currPage + 1} of 5
          </Text>
        </View>
        <View className="mt-2.5">
          <Progress.Bar
            progress={GetProgress(currPage)}
            width={Dimensions.get("window").width * 0.85}
            color={Color.White}
            height={10}
          />
        </View>
        <View
          style={{
            height: Dimensions.get("screen").height * 0.7,
            elevation: 1,
          }}
          className="p-6 bg-white mt-7 rounded-lg"
        >
          <Text className="text-xl font-semibold text-center">
            {quiz[currPage]?.question}
          </Text>
          {quiz[currPage]?.options.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedOption(index);
                OnOptionSelect(item);
              }}
              style={{
                borderColor: selectedOption == index ? Color.Green : null,
                backgroundColor:
                  selectedOption == index ? Color.Light_Green : null,
              }}
              className="p-4 mt-2 border-[1px] rounded-sm"
              key={index}
            >
              <Text className="text-xl">{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {selectedOption?.toString() && quiz?.length - 1 > currPage && (
          <Button
            text="Next"
            onPress={() => {
              setCurrPage(currPage + 1);
              setSelectedOption(null);
            }}
          />
        )}
        {selectedOption?.toString() && quiz?.length - 1 == currPage && (
          <Button
            text="Finish"
            onPress={() => onQuizFinish()}
            loading={loading}
          />
        )}
      </View>
    </View>
  );
};

export default Quiz;
