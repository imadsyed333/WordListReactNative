import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";

const Menu = ({ importWords, exportWords, clearWords }) => {
  return (
    <View style={styles.container}>
      <Text>Options </Text>
      <Button
        title="Import Words"
        onPress={importWords}
        style={{ backgroundColor: "#3C91E6" }}
      />
      <Button title="Export Words" onPress={exportWords} />
      <Button title="Clear Words" onPress={clearWords} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  title: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    paddingStart: 10,
  },
});

export default Menu;
