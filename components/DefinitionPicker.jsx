import React from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function DefinitionPicker(props) {
  return (
    <Modal
      visible={props.visible}
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          props.setVisible(false);
        }}
      >
        <View style={styles.overlay}></View>
      </TouchableWithoutFeedback>
      <View style={styles.container}>
        <Text style={styles.title}>Choose a definition</Text>
        <FlatList
          data={props.data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                props.setMeaning(item);
                props.setVisible(false);
              }}
            >
              <Text style={{ color: "white" }}>{item}</Text>
            </TouchableOpacity>
          )}
        />
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

  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
  },

  element: {},

  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#000000AA",
  },
});
