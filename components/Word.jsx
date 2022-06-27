import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import React, { Component } from "react";
import { FontAwesome, Entypo } from "@expo/vector-icons";

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
        { alignItems: "flex-end", justifyContent: "center" },
      ]}
    >
      <View>
        <FontAwesome
          name="trash-o"
          size={40}
          color="black"
          onPress={() => props.onDelete(props.id)}
          style={styles.delete_button}
        />
      </View>
      <View>
        <Entypo
          name="pencil"
          size={40}
          color="black"
          onPress={() => props.onEdit(props.id)}
        />
      </View>
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
    paddingEnd: 5,
    borderRadius: 10,
    alignSelf: "flex-end",
  },
  edit_button: {},
});
