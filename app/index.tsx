import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function WelcomeScreen() {
  const router = useRouter();
  const { userDetail, setUserDetail } = useContext(UserContext);

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const res = await getDoc(doc(db, "users", user?.email));
      setUserDetail(res.data());
      router.replace("/(tabs)/home");
    }
  });

  return (
    <View className="flex-1 bg-white">
      {/* Top Image Section */}
      <Image
        source={require("../assets/images/landing.png")}
        className="w-full h-[350px] mt-16"
        resizeMode="contain"
      />

      {/* Bottom Content Section */}
      <View className="flex-1 bg-primary px-8 pt-12 rounded-t-[40px] shadow-lg">
        {/* Welcome Title */}
        <Text className="text-4xl text-center text-white font-bold mb-4">
          Welcome to Coaching
        </Text>

        {/* Subtitle */}
        <Text className="text-lg text-center text-white opacity-90 leading-6">
          Transform your idea into engaging educational content, effortlessly
          with AI
        </Text>

        {/* Buttons Container */}
        <View className="mt-12 mb-10 space-y-6">
          {/* Get Started Button */}
          <TouchableOpacity
            className="bg-white py-4 rounded-xl shadow-md active:opacity-80"
            onPress={() => router.push("/auth/signup")}
          >
            <Text className="text-center text-primary font-bold text-lg">
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
