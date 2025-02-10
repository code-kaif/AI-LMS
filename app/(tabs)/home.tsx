import { View, Text, Platform, FlatList, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/home/Header";
import Color from "../../constant/Color";
import NoCourse from "../../components/home/NoCourse";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { UserContext } from "@/context/UserContext";
import CourseList from "@/components/home/CourseList";
import PracticeSection from "@/components/home/PracticeSection";
import CourseProgress from "@/components/home/CourseProgress";

const Home = () => {
  const { userDetail, setUserDetail } = useContext(UserContext);
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userDetail?.email) {
      GetCourseList();
    }
  }, [userDetail]);

  const GetCourseList = async () => {
    setLoading(true);
    setCourseList([]);
    const q = query(
      collection(db, "courses"),
      where("createdBy", "==", userDetail?.email)
    );
    const querySnapShot = await getDocs(q);

    querySnapShot.forEach((doc: any) => {
      setCourseList((prev) => [...prev, doc.data()]);
    });
    setLoading(false);
  };
  return (
    <FlatList
      data={[]}
      onRefresh={() => GetCourseList()}
      refreshing={loading}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View className="flex-1 bg-white">
          <Image
            source={require("../../assets/images/wave.png")}
            className="absolute w-full"
          />
          <View
            style={{
              padding: 25,
              paddingTop: Platform.OS === "ios" && 45,
            }}
          >
            <Header />
            {courseList?.length == 0 ? (
              <NoCourse />
            ) : (
              <View>
                <CourseProgress courseList={courseList} />
                <PracticeSection />
                <CourseList courseList={courseList} />
              </View>
            )}
          </View>
        </View>
      }
    />
  );
};

export default Home;
