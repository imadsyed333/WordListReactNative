import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";

const Menu = ({ importWords, exportWords, clearWords }) => {
  return (
    <View>
      <Text style={styles.title}>Options </Text>
      <Button title="Import Words" onPress={importWords} color={"#3C91E6"} />
      <Button title="Export Words" onPress={exportWords} color={"#7CEA9C"} />
      <Button title="Clear Words" onPress={clearWords} color={"#DE3C4B"} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    paddingStart: 10,
  },
});

export default Menu;
