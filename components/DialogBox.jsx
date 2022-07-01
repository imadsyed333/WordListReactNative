import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Entypo, Feather } from "@expo/vector-icons";

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
          placeholder="Enter name of entry"
          onChangeText={props.setName}
          value={props.name}
          style={styles.input}
          placeholderTextColor="gray"
        />
        <TextInput
          placeholder="Enter type of entry"
          onChangeText={props.setType}
          value={props.type}
          style={styles.input}
          placeholderTextColor="gray"
        />
        <TextInput
          placeholder="Enter meaning of entry"
          onChangeText={props.setMeaning}
          value={props.meaning}
          style={styles.input}
          multiline={true}
          placeholderTextColor="gray"
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            margin: 10,
          }}
        >
          <TouchableOpacity>
            <Entypo name="cross" size={45} color="#DE3C4B" onPress={onCancel} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather
              name="book-open"
              size={40}
              color="#3C91E6"
              onPress={getDefinition}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Entypo
              name="check"
              size={40}
              color="#7CEA9C"
              onPress={props.handleAction}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3c3645",
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
    justifyContent: "center",
    top: "20%",
  },
  input: {
    color: "#fff",
    fontSize: 15,
    margin: 10,
    textDecorationLine: "underline",
    textDecorationColor: "gray",
  },
  button: {
    margin: 10,
  },
});
