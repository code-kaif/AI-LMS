import { Stack } from "expo-router";
import "./globals.css";
import { useState } from "react";
import { UserContext } from "@/context/UserContext";

export default function RootLayout() {
  const [userDetail, setUserDetail] = useState<any>(null);

  return (
    <UserContext.Provider value={{ userDetail, setUserDetail }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      ></Stack>
    </UserContext.Provider>
  );
}
