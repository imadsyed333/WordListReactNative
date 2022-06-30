import React, { Component, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { Word, HiddenWord } from "./Word";
import { Feather } from "@expo/vector-icons";

export default function WordList(props) {
  const listRef = useRef();
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
  const CONTENT_OFFSET_THRESHOLD = 300;

  return (
    <View style={styles.container}>
      <SwipeListView
        listViewRef={listRef}
        style={styles.container}
        data={props.words}
        renderItem={({ item }) => (
          <Word name={item.name} type={item.type} meaning={item.meaning} />
        )}
        renderHiddenItem={({ item }) => (
          <HiddenWord
            id={item.id}
            onDelete={props.onDelete}
            onEdit={props.onEdit}
          ></HiddenWord>
        )}
        disableRightSwipe
        rightOpenValue={-75}
        recalculateHiddenLayout={true}
        onScroll={(event) => {
          setContentVerticalOffset(event.nativeEvent.contentOffset.y);
        }}
      />
      {contentVerticalOffset > CONTENT_OFFSET_THRESHOLD && (
        <TouchableOpacity
          style={styles.button}
          opacity={0.5}
          onPress={() => {
            listRef.current.scrollToOffset({ offset: 0, animated: true });
          }}
        >
          <Feather name="arrow-up" size={40} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
}
styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "stretch",
  },
  button: {
    position: "absolute",
    height: 70,
    width: 70,
    backgroundColor: "rgba(115, 251, 211, 0.5)",
    alignSelf: "center",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
