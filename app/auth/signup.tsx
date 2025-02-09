import { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/config/firebaseConfig";
import { UserContext } from "@/context/UserContext";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { userDetail, setUserDetail } = useContext(UserContext);

  const CreateAccount = async () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        const user = res.user;
        await SaveUser(user);
        setLoading(true);
        router.replace("/(tabs)/home");
      })
      .catch((e) => {
        console.log(e.message);
        setLoading(true);
      });
  };

  const SaveUser = async (user: any) => {
    const data = {
      name: name,
      email: email,
      member: false,
      uid: user?.uid,
    };
    await setDoc(doc(db, "users", email), data);
    setUserDetail(data);
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="relative">
          <Image
            source={require("../../assets/images/banner1.png")}
            className="w-full h-56"
          />
          <LinearGradient
            colors={["transparent", "white"]}
            className="absolute bottom-0 w-full h-24"
          />
        </View>

        <View className="p-6 mt-5">
          <Text className="text-4xl font-bold text-center py-3">
            Create Account
          </Text>
          <Text className="text-gray text-center mb-6">
            Sign up to get started
          </Text>

          <TextInput
            placeholder="Full Name"
            className="border border-gray rounded-lg px-3 py-5 mb-4"
            value={name}
            onChangeText={(val) => setName(val)}
          />
          <TextInput
            placeholder="Email"
            className="border border-gray rounded-lg px-3 py-5 mb-4"
            value={email}
            onChangeText={(val) => setEmail(val)}
          />
          <TextInput
            placeholder="Password"
            className="border border-gray rounded-lg px-3 py-5  mb-4"
            secureTextEntry
            value={password}
            onChangeText={(val) => setPassword(val)}
          />

          <TouchableOpacity
            disabled={loading}
            onPress={CreateAccount}
            className="bg-primary p-3 rounded-lg flex items-center justify-center"
          >
            {loading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Text className="text-white text-xl font-bold p-2">
                Create Account
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/auth/signin")}
            className="mt-4"
          >
            <Text className="text-center text-primary">
              Already have an account? Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Signup;
