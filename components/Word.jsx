import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome, Entypo } from "@expo/vector-icons";

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
  const onEdit = () => {
    props.rowMap[props.item.id].closeRow();
    props.onEdit(props.id);
  };
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: "#3c3645" },
        { alignItems: "flex-start", justifyContent: "center" },
      ]}
    >
      <View style={{ borderRadius: 10 }}>
        <FontAwesome
          name="trash-o"
          size={40}
          color="#DE3C4B"
          onPress={() => props.onDelete(props.id)}
        />
        <Entypo name="pencil" size={40} color="#FBF2C0" onPress={onEdit} />
      </View>
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
  delete_button: {
    margin: 5,
    borderRadius: 10,
    alignSelf: "center",
  },
});
