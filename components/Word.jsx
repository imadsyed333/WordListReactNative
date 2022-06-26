import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import React, { Component } from "react";

export function Word(props) {
  return (
    <View style={[styles.container, { backgroundColor: "#0EB1D2" }]}>
      <Text style={styles.name}>{props.name}</Text>
      <Text style={styles.word}>{props.type}</Text>
      <Text style={styles.word}>{props.meaning}</Text>
    </View>
  );
}

export function HiddenWord(props) {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: "red" },
        { alignItems: "flex-end" },
      ]}
    >
      <Text onPress={() => props.onDelete(props.id)} style={styles.button}>
        Delete
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    alignContent: "stretch",
    shadowOpacity: 0.4,
    shadowRadius: 5.46,

    elevation: 9,
    margin: 10,
    flex: 1,
  },
  word: {
    fontWeight: "bold",
    color: "#303030",
  },
  name: {
    fontWeight: "bold",
    color: "#303030",
    fontSize: 30,
  },
  button: {
    flex: 1,
    color: "black",
    backgroundColor: "maroon",
  },
});
