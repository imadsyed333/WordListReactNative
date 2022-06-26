import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { Word, HiddenWord } from "./Word";

export default function WordList(props) {
  return (
    <SwipeListView
      style={styles.container}
      data={props.words}
      renderItem={({ item }) => (
        <Word name={item.name} type={item.type} meaning={item.meaning} />
      )}
      renderHiddenItem={({ item }) => (
        <HiddenWord id={item.id} onDelete={props.onDelete}></HiddenWord>
      )}
      disableRightSwipe
      rightOpenValue={-75}
    />
  );
}
styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "stretch",
  },
  button: {
    flex: 1,
    backgroundColor: "maroon",
    color: "black",
  },
});
