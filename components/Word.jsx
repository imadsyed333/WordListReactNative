import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import DialogBox from "./DialogBox";

const Word = React.memo(function Word(props) {
  return (
    <View style={[styles.container, { backgroundColor: "#C490D1" }]}>
      <Text style={styles.name}>{props.name}</Text>
      <Text style={styles.type}>{props.type}</Text>
      <Text style={styles.meaning}>{props.meaning}</Text>
    </View>
  );
});

const HiddenWord = React.memo(function HiddenWord(props) {
  const [visible, setVisible] = useState(false);

  const deleteWord = () => {
    const newWords = [...props.words];
    const prevIndex = props.words.findIndex((item) => item.id === props.id);
    newWords.splice(prevIndex, 1);
    props.setWords(newWords);
  };

  const editWord = (name, type, meaning) => {
    const newWords = [...props.words];
    const prevIndex = props.words.findIndex((item) => item.id === props.id);
    newWords[prevIndex].name = name;
    newWords[prevIndex].type = type;
    newWords[prevIndex].meaning = meaning;
    props.setWords(newWords);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: "#3c3645" },
        { alignItems: "flex-start", justifyContent: "center" },
      ]}
    >
      <View style={{ justifyContent: "space-between" }}>
        <FontAwesome
          name="trash-o"
          size={40}
          color="#DE3C4B"
          onPress={() => {
            deleteWord();
          }}
        />
        <Entypo name="pencil" size={40} color="#FBF2C0" onPress={onEdit} />
      </View>
      <DialogBox
        visible={visible}
        setVisible={setVisible}
        action={editWord}
        name={props.item.name}
        type={props.item.type}
        meaning={props.item.meaning}
      />
    </View>
  );
});

export { Word, HiddenWord };

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

  type: {
    paddingTop: 5,
    color: "#303030",
  },

  meaning: {
    paddingTop: 5,
    fontWeight: "bold",
    color: "#303030",
  },
  name: {
    fontWeight: "bold",
    color: "#303030",
    fontSize: 30,
  },
});
