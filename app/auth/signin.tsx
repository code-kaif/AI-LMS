import { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router, useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/config/firebaseConfig";
import { UserContext } from "@/context/UserContext";
import { signInWithEmailAndPassword } from "firebase/auth";

const Signin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { userDetail, setUserDetail } = useContext(UserContext);

  const CreateAccount = async () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        const user = res.user;
        await getUserDetail();
        setLoading(false);
        router.replace("/(tabs)/home");
      })
      .catch((e) => {
        console.log(e.message);
        setLoading(false);
        ToastAndroid.show("Incorrect Email and Password", ToastAndroid.BOTTOM);
      });
  };

  const getUserDetail = async () => {
    const res = await getDoc(doc(db, "users", email));
    console.log(res.data());
    setUserDetail(res.data());
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="relative">
          <Image
            source={require("../../assets/images/banner2.png")}
            className="w-full h-56"
          />
          <LinearGradient
            colors={["transparent", "white"]}
            className="absolute bottom-0 w-full h-24"
          />
        </View>

        <View className="p-6 mt-5">
          <Text className="text-4xl font-bold text-center py-3">
            Welcome Back
          </Text>
          <Text className="text-gray text-center mb-6">
            Sign in and start learning
          </Text>
          <TextInput
            placeholder="Email"
            className="border border-gray rounded-lg px-3 py-5 mb-4"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Password"
            className="border border-gray rounded-lg px-3 py-5  mb-4"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            disabled={loading}
            onPress={CreateAccount}
            className="bg-primary p-3 rounded-lg flex items-center justify-center"
          >
            {loading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Text className="text-white text-xl font-bold p-2">Sign In</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/auth/signup")}
            className="mt-4"
          >
            <Text className="text-center text-primary">
              Don't have an account? Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Signin;
