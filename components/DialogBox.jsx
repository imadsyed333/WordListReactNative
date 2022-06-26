import React, { Component, useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, Modal } from "react-native";
import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";

export default function DialogBox(props) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [meaning, setMeaning] = useState("");

  const setWord = () => {
    props.handleAdd(name, type, meaning);
    setName("");
    setMeaning("");
    setType("");
  };

  const onCancel = () => {
    setName("");
    setMeaning("");
    setType("");
    props.handleCancel();
  };

  const getDefinition = () => {
    let url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + name;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        const newMeaning = json[0].meanings[0].definitions[0].definition;
        setMeaning(newMeaning);
      })
      .catch((error) => {
        alert("name field is empty or official meaning does not exist");
      });
  };

  return (
    <Modal
      visible={props.visible}
      animationType="slide"
      transparent={true}
      backgroundColor={"rgba(0,0,0,0.5)"}
    >
      <View style={styles.container}>
        <TextInput
          placeholder="enter name of entry"
          onChangeText={setName}
          value={name}
          style={styles.input}
          placeholderTextColor="gray"
        />
        <TextInput
          placeholder="enter type of entry"
          onChangeText={setType}
          value={type}
          style={styles.input}
          placeholderTextColor="gray"
        />
        <TextInput
          placeholder="enter meaning of entry"
          onChangeText={setMeaning}
          value={meaning}
          style={styles.input}
          multiline={true}
          placeholderTextColor="gray"
        />
        <Button title="get official definition" onPress={getDefinition} />
        <Button title="Cancel" onPress={onCancel} />
        <Button title="Add Word" onPress={setWord} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#303030",
    flex: 0,
    margin: 10,
    padding: 10,
    top: 50,
    borderRadius: 10,
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
    justifyContent: "space-around",
  },
  input: {
    color: "#fff",
  },
});
