import { View, Text, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import * as Progress from "react-native-progress";
import Button from "@/components/shared/Button";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

const ChapterView = () => {
  const { chapterParams, docId, chapterIndex } = useLocalSearchParams();
  const chapters = JSON.parse(chapterParams);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const GetProgress = (currentPage: any) => {
    const perc = currentPage / chapters?.content?.length;
    return perc;
  };

  const onChapterComplete = async () => {
    setLoading(true);
    await updateDoc(doc(db, "courses", docId), {
      completedChapter: arrayUnion(chapterIndex),
    });
    setLoading(false);
    router.replace("/courseView/" + docId);
  };

  return (
    <View className="p-6 bg-white flex-1">
      <Progress.Bar
        progress={GetProgress(currentPage)}
        width={Dimensions.get("screen").width * 0.85}
      />
      <View className="mt-5">
        <Text className="font-semibold text-[20px]">
          {chapters?.content[currentPage]?.topic}
        </Text>

        <Text className="text-[16px] mt-2">
          {chapters?.content[currentPage]?.explain}
        </Text>

        {chapters?.content[currentPage]?.code && (
          <Text className="p-4 rounded-md text-[15px] mt-4 bg-black text-white">
            {chapters?.content[currentPage]?.code}
          </Text>
        )}
        {/* <Text>Emample:</Text> */}
        {chapters?.content[currentPage]?.example && (
          <Text className="p-4 bg-bGray rounded-md text-[15px] mt-4">
            {chapters?.content[currentPage]?.example}
          </Text>
        )}
      </View>
      <View className="absolute bottom-4 w-full left-6">
        {chapters?.content?.length - 1 != currentPage ? (
          <Button text="Next" onPress={() => setCurrentPage(currentPage + 1)} />
        ) : (
          <Button
            text="Finish"
            loading={loading}
            onPress={() => onChapterComplete()}
          />
        )}
      </View>
    </View>
  );
};

export default ChapterView;
