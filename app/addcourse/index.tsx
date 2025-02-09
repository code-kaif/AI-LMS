import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import Button from "../../components/shared/Button";
import {
  GenerateCourseAiModel,
  GenerateTopicsAiModel,
} from "../../config/AiModel";
import Prompt from "../../constant/Prompt";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "expo-router";

const AddCourse: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>("");
  const [topics, setTopics] = useState([]);
  const [selectTopic, setSelectTopic] = useState([]);
  const { userDetail } = useContext(UserContext);

  const router = useRouter();

  const onGenerateTopic = async () => {
    if (!userInput.trim()) return;
    setLoading(true);
    const PROMPT = userInput + Prompt.IDEA;
    try {
      const aiResponse = await GenerateTopicsAiModel.sendMessage(PROMPT);
      const topicIdea = JSON.parse(aiResponse.response.text());
      console.log(topicIdea);
      setTopics(topicIdea?.course_titles);
    } catch (error) {
      console.error("Error generating topic:", error);
    }
    setLoading(false);
  };

  const onTopicSelection = (topic: any) => {
    setSelectTopic(
      (prev: any) =>
        prev.includes(topic)
          ? prev.filter((item: any) => item !== topic) // Remove the topic if already selected
          : [...prev, topic] // Add the topic if not selected
    );
  };

  const isTopicSelected = (topic: any) => {
    const selection = selectTopic.find((item) => item === topic);
    return selection ? topic : false;
  };

  const onGenerateCourse = async () => {
    setLoading(true);
    const PROMPT = selectTopic + Prompt.COURSE;
    try {
      const aiRes = await GenerateCourseAiModel.sendMessage(PROMPT);
      const res = JSON.parse(aiRes.response.text());
      const courses = res.courses;
      console.log(courses);

      courses?.forEach(async (course: any) => {
        const docId = Date.now().toString();
        await setDoc(doc(db, "courses", docId), {
          ...course,
          createdOn: new Date(),
          createdBy: userDetail?.email ?? "",
          docId: docId,
        });
      });
      router.push("/(tabs)/home");
      setLoading(false);
    } catch (error) {
      console.error("Error generating course:", error);
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <Text className="font-bold text-[25px]">Create New Course</Text>
      <Text className="font-normal text-[30px] mt-2">
        What do you want to learn today?
      </Text>
      <Text className="font-normal text-lg mt-2 text-gray-500">
        Write what course you want to create (Ex. Learn React Js, Digital
        Marketing, Python, etc.)
      </Text>

      <TextInput
        placeholder="Ex - Learn JavaScript"
        className="p-4 border border-gray-300 rounded-xl h-24 mt-4 text-lg"
        numberOfLines={2}
        multiline
        onChangeText={setUserInput}
        value={userInput}
      />

      <Button
        text="Generate Topic"
        type="outline"
        onPress={onGenerateTopic}
        loading={loading}
      />

      <View className="mt-4">
        <Text className="text-[20px]">
          Select topic which you want to add in course
        </Text>
        <View className="flex flex-row flex-wrap gap-2.5 mt-1.5">
          {topics.map((item, index) => (
            <Pressable key={index} onPress={() => onTopicSelection(item)}>
              <Text
                className={`p-2 text-sm font-medium border-[1px] rounded-full px-4 ${
                  isTopicSelected(item)
                    ? "bg-primary text-white border-[0px]"
                    : ""
                }`}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {selectTopic?.length > 0 && (
        <View className="my-10">
          <Button
            text="Generate Course"
            onPress={() => onGenerateCourse()}
            loading={loading}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default AddCourse;
