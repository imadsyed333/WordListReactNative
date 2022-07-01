import React, { useRef, useState } from "react";
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
        keyExtractor={(item) => item.id}
        renderItem={(rowData, rowMap) => (
          <Word
            name={rowData.item.name}
            type={rowData.item.type}
            meaning={rowData.item.meaning}
            rowMap={rowMap}
            item={rowData.item}
          />
        )}
        renderHiddenItem={(rowData, rowMap) => (
          <HiddenWord
            item={rowData.item}
            rowMap={rowMap}
            id={rowData.item.id}
            onDelete={props.onDelete}
            onEdit={props.onEdit}
          ></HiddenWord>
        )}
        disableLeftSwipe
        leftOpenValue={75}
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
    height: 50,
    width: 50,
    backgroundColor: "rgba(255, 237, 223, 0.5)",
    alignSelf: "center",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
