import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import React, { Component } from "react";

export function Word(props) {
  return (
    <View style={[styles.container, { backgroundColor: "#07A0C3" }]}>
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
        { backgroundColor: "#DE3C4B" },
        { alignItems: "flex-end" },
      ]}
    >
      <Text
        onPress={() => props.onDelete(props.id)}
        style={styles.delete_button}
      >
        U+F78B
      </Text>
    </View>
  );
  s;
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
  delete_button: {
    flex: 1,
    color: "black",
  },
  edit_button: {},
});
