import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import Color from "../../constant/Color";

interface ButtonProps {
  text: string;
  type?: "fill" | "outline";
  onPress?: () => void;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  type = "fill",
  onPress,
  loading,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      className={`w-full rounded-xl mt-4 border p-4 ${
        type === "fill"
          ? "bg-primary border-primary"
          : "bg-white border-primary"
      }`}
    >
      {!loading ? (
        <Text
          className={`text-center font-semibold text-lg ${
            type === "fill" ? "text-white" : "text-primary"
          }`}
        >
          {text}
        </Text>
      ) : (
        <ActivityIndicator
          size="large"
          color={type === "fill" ? Color.White : Color.Primary}
        />
      )}
    </TouchableOpacity>
  );
};

export default Button;
