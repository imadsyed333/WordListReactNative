import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";

export default function DefinitionPicker(props) {
  const deviceHeight = Dimensions.get("screen").height;
  return (
    <Modal
      isVisible={props.visible}
      statusBarTranslucent
      onBackdropPress={() => {
        props.setVisible(false);
      }}
      deviceHeight={deviceHeight}
      useNativeDriver
    >
      <View style={styles.container}>
        <Text style={styles.title}>Choose a definition</Text>
        <FlatList
          data={props.data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                props.setMeaning(item.meaning);
                props.setType(item.type);
                props.setVisible(false);
              }}
            >
              <Text style={styles.element}>{item.meaning}</Text>
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
    marginVertical: StatusBar.currentHeight + 40,
    marginHorizontal: 10,
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
  },

  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
  },

  element: {
    padding: 5,
    margin: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#C490D1",
    color: "white",
  },
});
