import { View, Text, Image, Pressable, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { PracticeOption } from "@/constant/Option";
import AntDesign from "@expo/vector-icons/AntDesign";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { UserContext } from "@/context/UserContext";
import Color from "@/constant/Color";
import CourseListGrid from "@/components/PracticeScreen/CourseListGrid";

const PracticeTypeHome = () => {
  const { userDetail } = useContext(UserContext);
  const { type } = useLocalSearchParams();
  const option = PracticeOption.find((item) => item.name == type);
  const [loading, setLoading] = useState(false);
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    userDetail && GetCourseList();
  }, [userDetail]);

  const GetCourseList = async () => {
    setLoading(true);
    setCourseList([]);
    try {
      const q = query(
        collection(db, "courses"),
        where(
          "createdBy",
          "==",
          userDetail?.email,
          orderBy("createdOn", "desc")
        )
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc: any) => {
        console.log(doc.data());
        setCourseList((prev) => [...prev, doc.data()]);
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <View>
      <Image source={option?.image} className="h-56 w-full" />
      <View className="absolute p-2.5 flex flex-row gap-5 items-center">
        <Pressable onPress={() => router.back()}>
          <AntDesign
            name="arrowleft"
            size={26}
            color="black"
            className="bg-white p-2 rounded-full"
          />
        </Pressable>
        <Text className="font-semibold text-3xl text-white">{type}</Text>
      </View>

      {loading && (
        <ActivityIndicator
          className="mt-40"
          size={"large"}
          color={Color.Primary}
        />
      )}

      <CourseListGrid courseList={courseList} option={option} />
    </View>
  );
};

export default PracticeTypeHome;
