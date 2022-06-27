import React, { Component, useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, Modal } from "react-native";

export default function DialogBox(props) {
  const onCancel = () => {
    props.setName("");
    props.setMeaning("");
    props.setType("");
    props.handleCancel();
  };

  const getDefinition = () => {
    let url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + props.name;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        const newMeaning = json[0].meanings[0].definitions[0].definition;
        props.setMeaning(newMeaning);
      })
      .catch((error) => {
        console.log(error);
        alert("Name field is empty, or the word does not exist");
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
          onChangeText={props.setName}
          value={props.name}
          style={styles.input}
          placeholderTextColor="gray"
        />
        <TextInput
          placeholder="enter type of entry"
          onChangeText={props.setType}
          value={props.type}
          style={styles.input}
          placeholderTextColor="gray"
        />
        <TextInput
          placeholder="enter meaning of entry"
          onChangeText={props.setMeaning}
          value={props.meaning}
          style={styles.input}
          multiline={true}
          placeholderTextColor="gray"
        />
        <Button title="Get Official Definition" onPress={getDefinition} />
        <Button title="Cancel" onPress={onCancel} />
        <Button title={props.dialogFunction} onPress={props.handleAction} />
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
