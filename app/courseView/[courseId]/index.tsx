import { View, Text, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import Intro from "@/components/CourseView/Intro";
import Chapters from "@/components/CourseView/Chapters";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

const CourseView = () => {
  const { courseParams, courseId } = useLocalSearchParams();
  const [course, setCourse] = useState([]);
  // const course = JSON.parse(courseParams);

  const GetCourseId = async () => {
    const docRef = await getDoc(doc(db, "courses", courseId));
    const courseData = docRef.data();
    setCourse(courseData);
  };

  useEffect(() => {
    if (!courseParams) {
      GetCourseId();
    } else {
      setCourse(JSON.parse(courseParams));
    }
  }, [courseId]);

  return (
    course && (
      <FlatList
        data={[]}
        ListHeaderComponent={
          <View className="flex-1 bg-white">
            <Intro course={course} />
            <Chapters course={course} />
          </View>
        }
      />
    )
  );
};

export default CourseView;
