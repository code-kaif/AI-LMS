import { View, Text, Platform, FlatList } from "react-native";
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

  useEffect(() => {
    if (userDetail?.email) {
      GetCourseList();
    }
  }, [userDetail]);

  const GetCourseList = async () => {
    setCourseList([]);
    const q = query(
      collection(db, "courses"),
      where("createdBy", "==", userDetail?.email)
    );
    const querySnapShot = await getDocs(q);

    querySnapShot.forEach((doc: any) => {
      setCourseList((prev) => [...prev, doc.data()]);
    });
  };
  return (
    <FlatList
      data={[]}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View
          style={{
            padding: 25,
            paddingTop: Platform.OS === "ios" && 45,
            flex: 1,
            backgroundColor: Color.White,
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
      }
    />
  );
};

export default Home;
