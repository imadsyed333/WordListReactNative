import React from "react";
import { SafeAreaView, Text } from "react-native";

export default function WordScreen({ route }) {
  return (
    <SafeAreaView>
      <Text>{route.params.name}</Text>
      <Text>{route.params.type}</Text>
      <Text>{route.params.meaning}</Text>
    </SafeAreaView>
  );
}
