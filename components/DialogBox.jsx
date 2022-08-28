import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { Entypo, Feather } from "@expo/vector-icons";
import DefinitionPicker from "./DefinitionPicker";
import Modal from "react-native-modal";

export default function DialogBox(props) {
  const [defs, setDefs] = useState([]);
  const [visible, setVisible] = useState(false);

  const deviceHeight = Dimensions.get("screen").height;

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
        const defList = [];
        for (let i = 0; i < json.length; i++) {
          const meanings = json[i].meanings;
          for (let j = 0; j < meanings.length; j++) {
            const definitions = meanings[j].definitions;
            const type = meanings[j].partOfSpeech;
            for (let k = 0; k < definitions.length; k++) {
              defList.push({ type: type, meaning: definitions[k].definition });
            }
          }
        }
        setDefs(defList);
        setVisible(true);
      })
      .catch((error) => {
        console.log(error);
        alert("Name field is empty");
      });
  };

  return (
    <Modal
      isVisible={props.visible}
      hasBackdrop
      backdropColor="black"
      backdropOpacity={0.7}
      avoidKeyboard
      style={{ margin: 0 }}
      deviceHeight={deviceHeight}
      statusBarTranslucent
      onBackdropPress={onCancel}
      useNativeDriver
    >
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
        <DefinitionPicker
          data={defs}
          visible={visible}
          setMeaning={props.setMeaning}
          setType={props.setType}
          setVisible={setVisible}
        />
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
              <Entypo
                name="cross"
                size={45}
                color="#DE3C4B"
                onPress={onCancel}
              />
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
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3c3645",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5.46,
    elevation: 9,
    top: 0,
  },
  input: {
    color: "#fff",
    fontSize: 15,
    margin: 10,
    textDecorationColor: "gray",
    borderBottomColor: "#C490D1",
    borderBottomWidth: 1,
  },
});
